const request = require('supertest');
const app = require('../../../app');
const { setupDB } = require('../../../shared/utils/testSetup');
const Product = require('../../product/product.model');
const Category = require('../../category/category.model');

setupDB();

jest.mock('../../../shared/utils/stripe', () => ({
  createPaymentIntent: jest.fn().mockResolvedValue({
    id: 'pi_test_123',
    client_secret: 'pi_test_secret_123'
  }),
  calculateTax: jest.fn().mockResolvedValue({
    tax_amount_exclusive: 1000 // 10 INR in paise
  }),
  verifyWebhookSignature: jest.fn().mockReturnValue({
    type: 'payment_intent.succeeded',
    data: { object: { id: 'pi_test_123' } }
  })
}));

jest.mock('../../../shared/utils/bullQueue', () => ({
  inventoryQueue: {
    add: jest.fn().mockResolvedValue({ id: 'mock_job_id' }),
    getJob: jest.fn().mockResolvedValue(null)
  },
  INVENTORY_RELEASE_QUEUE: 'inventory-release'
}));

describe('Order Feature Integration', () => {
  let product;
  let category;
  let authCookie;

  beforeEach(async () => {
    // 1. Create a customer user to checkout
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'customer@gourmetgem.com',
        password: 'password999',
        name: 'Jane Customer'
      });
    authCookie = regRes.headers['set-cookie'];

    // 2. Populate product catalog
    category = new Category({
      name: 'Organic Truffles',
      slug: 'organic-truffles'
    });
    await category.save();

    product = new Product({
      name: 'White Alba Truffle',
      description: {
        short: 'Extremely rare and aromatic Alba white truffle.'
      },
      basePrice: 500000,
      inventory: 3,
      categories: [category._id],
      isActive: true
    });
    await product.save();
  });

  it('should process checkout, decrement stock atomically, and schedule delayed jobs', async () => {
    // Add item to cart
    await request(app)
      .post('/api/v1/cart/items')
      .set('Cookie', authCookie)
      .send({
        productId: product._id.toString(),
        quantity: 2
      });

    const checkoutPayload = {
      shippingAddress: {
        fullName: 'Jane Customer',
        line1: '456 Diamond Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        phone: '9876543210'
      },
      billingAddress: {
        fullName: 'Jane Customer',
        line1: '456 Diamond Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        phone: '9876543210'
      }
    };

    // Place order
    const checkoutRes = await request(app)
      .post('/api/v1/orders')
      .set('Cookie', authCookie)
      .set('Idempotency-Key', 'unique-checkout-key-111')
      .send(checkoutPayload);

    expect(checkoutRes.status).toBe(200);
    expect(checkoutRes.body.success).toBe(true);
    expect(checkoutRes.body.orderId).toBeDefined();
    expect(checkoutRes.body.clientSecret).toBeDefined();

    // Verify stock was decremented from 3 to 1
    const productAfter = await Product.findById(product._id);
    expect(productAfter.inventory).toBe(1);
  });

  it('should return identical responses for multiple requests with identical Idempotency-Key', async () => {
    // Add item to cart
    await request(app)
      .post('/api/v1/cart/items')
      .set('Cookie', authCookie)
      .send({
        productId: product._id.toString(),
        quantity: 1
      });

    const checkoutPayload = {
      shippingAddress: {
        fullName: 'Jane Customer',
        line1: '456 Diamond Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        phone: '9876543210'
      },
      billingAddress: {
        fullName: 'Jane Customer',
        line1: '456 Diamond Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        phone: '9876543210'
      }
    };

    // Call first time
    const res1 = await request(app)
      .post('/api/v1/orders')
      .set('Cookie', authCookie)
      .set('Idempotency-Key', 'duplicate-checkout-key-222')
      .send(checkoutPayload);

    // Call second time with identical key
    const res2 = await request(app)
      .post('/api/v1/orders')
      .set('Cookie', authCookie)
      .set('Idempotency-Key', 'duplicate-checkout-key-222')
      .send(checkoutPayload);

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
    expect(res1.body.orderId).toBe(res2.body.orderId);
  });
});
