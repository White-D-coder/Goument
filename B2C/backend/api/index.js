const express = require('express');
const { connectDatabase, installSchema } = require('../database/client');
const { createAuthApp } = require('../auth/app');

let cachedDb = null;
let cachedApp = null;

async function getApp() {
  if (cachedApp) return cachedApp;

  const app = express();
  app.use(express.json());

  // Root & Healthcheck endpoints
  app.get('/', (req, res) => {
    res.json({
      service: 'Gourmet B2C Auth & Ecommerce API',
      status: 'active',
      database: cachedDb ? 'connected' : 'waiting_for_configuration',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/healthz', (req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  const origin = process.env.AUTH_ORIGIN || 'https://gourmet-b2c.vercel.app';

  if (process.env.B2C_DATABASE_URI) {
    try {
      cachedDb = await connectDatabase();
      await installSchema(cachedDb);
      const authApp = createAuthApp({
        db: cachedDb,
        origin,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      });
      app.use(authApp);

      // Public Products catalogue endpoints
      app.get('/api/v1/products', async (req, res) => {
        try {
          const { search = '', page = 1, limit = 12 } = req.query;
          const filter = { status: 'ACTIVE' };
          if (search) {
            filter.$or = [
              { name: { $regex: search, $options: 'i' } },
              { shortDescription: { $regex: search, $options: 'i' } }
            ];
          }
          const pageNum = Math.max(1, parseInt(page, 10) || 1);
          const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
          const skip = (pageNum - 1) * limitNum;
          const [products, total] = await Promise.all([
            cachedDb.models.Product.find(filter).skip(skip).limit(limitNum).lean(),
            cachedDb.models.Product.countDocuments(filter)
          ]);
          res.json({
            products,
            total,
            pages: Math.ceil(total / limitNum)
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

      app.get('/api/v1/products/:slug', async (req, res) => {
        try {
          const product = await cachedDb.models.Product.findOne({ slug: req.params.slug, status: 'ACTIVE' }).lean();
          if (!product) return res.status(404).json({ error: 'Not found' });
          res.json({ data: product });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
    } catch (err) {
      console.error('B2C Database connection error:', err);
      app.use('/api/v1/auth', (req, res) => {
        res.status(500).json({
          error: 'database_connection_error',
          message: err.message
        });
      });
    }
  } else {
    app.use('/api/v1/auth', (req, res) => {
      res.status(503).json({
        error: 'database_not_configured',
        message: 'Please configure B2C_DATABASE_URI and B2C_DATABASE_NAME in Vercel Environment Variables.'
      });
    });
  }

  cachedApp = app;
  return cachedApp;
}

module.exports = async (req, res) => {
  const app = await getApp();
  return app(req, res);
};
