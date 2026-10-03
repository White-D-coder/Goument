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
