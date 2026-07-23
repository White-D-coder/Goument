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
});
