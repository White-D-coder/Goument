const request = require('supertest');
const app = require('../../../app');
const { setupDB } = require('../../../shared/utils/testSetup');
const Product = require('../../product/product.model');
const Category = require('../../category/category.model');

setupDB();

describe('Cart Feature Integration', () => {
  let product;
  let category;

  beforeEach(async () => {
    category = new Category({
      name: 'Organic Chocolates',
      slug: 'organic-chocolates'
    });
    await category.save();

    product = new Product({
      name: 'Hazelnut Praline Box',
      description: {
        short: 'Creamy roasted hazelnut praline inside gourmet shell.'
      },
      basePrice: 150000,
      inventory: 5,
      categories: [category._id],
      isActive: true
    });
    await product.save();
  });

  it('should block items adding when requested quantity exceeds stock', async () => {
    const res = await request(app)
      .post('/api/v1/cart/items')
      .set('X-Session-Id', 'guest_session_1234')
      .send({
        productId: product._id.toString(),
        quantity: 10
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Insufficient inventory');
  });

  it('should allow adding item if stock is sufficient', async () => {
    const res = await request(app)
      .post('/api/v1/cart/items')
      .set('X-Session-Id', 'guest_session_1234')
      .send({
        productId: product._id.toString(),
        quantity: 2
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items).toHaveLength(1);
    expect(res.body.data.items[0].quantity).toBe(2);
  });

  it('should return current server prices and names without private cost fields', async () => {
    const session = 'b2c-display-cart';
    await request(app).post('/api/v1/cart/items').set('X-Session-Id', session)
      .send({ productId: String(product._id), quantity: 1, unitPrice: 1 });
    await Product.findByIdAndUpdate(product._id, { basePrice: 175000, costPrice: 90000 });
    const response = await request(app).get('/api/v1/cart').set('X-Session-Id', session);
    expect(response.status).toBe(200);
    expect(response.body.data.items[0]).toMatchObject({
      name: 'Hazelnut Praline Box', unitPrice: 175000, currency: 'INR', available: true
    });
    expect(response.body.data.items[0]).not.toHaveProperty('costPrice');
  });

  it('should preserve a removable cart line when its product disappears', async () => {
    const session = 'b2c-unavailable-cart';
    await request(app).post('/api/v1/cart/items').set('X-Session-Id', session)
      .send({ productId: String(product._id), quantity: 1 });
    await Product.findByIdAndDelete(product._id);
    const response = await request(app).get('/api/v1/cart').set('X-Session-Id', session);
    expect(response.status).toBe(200);
    expect(response.body.data.items[0]).toMatchObject({
      name: 'Unavailable gift', unitPrice: null, available: false
    });
    const removed = await request(app).delete(`/api/v1/cart/items/${product._id}`)
      .set('X-Session-Id', session);
    expect(removed.status).toBe(200);
    expect(removed.body.data.items).toEqual([]);
  });
});
