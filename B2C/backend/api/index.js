'use strict';
const express = require('express');
const helmet = require('helmet');
const { connectDatabase } = require('../database/client');
const { createAuthApp } = require('../auth/app');
const { razorpayGateway } = require('../payments/razorpay');
const { mountCatalogue } = require('../catalogue/routes');

// One initialization per warm instance; failures are retryable, never cached as an app.
// Schema installation is an explicit operator command, not a cold-start side effect.
function createHandler({ connect = connectDatabase, authFactory = createAuthApp, gatewayFactory = razorpayGateway, env = process.env, retryDelayMs = 1000 } = {}) {
  let cachedApp, database, initializing, retryAt = 0;
  async function initialize() {
    if (cachedApp) return cachedApp;
    if (Date.now() < retryAt) throw new Error('Service unavailable');
    if (!initializing) initializing = (async () => {
      if (!env.B2C_DATABASE_URI || !env.B2C_DATABASE_NAME || (env.NODE_ENV === 'production' && !env.AUTH_ORIGIN)) throw new Error('Service unavailable');
      const db = await connect();
      try {
        const app = express(); app.disable('x-powered-by'); app.use(helmet());
        app.get('/', (req,res)=>res.json({ service: 'Gourmet B2C API', status: 'active' }));
        app.get('/healthz', (req,res)=>res.json({ ok: true }));
        app.use(authFactory({ db, origin: env.AUTH_ORIGIN || 'http://localhost:3000', clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET,
          maintenanceSecret: env.CRON_SECRET, paymentGateway: gatewayFactory({ keyId: env.RAZORPAY_KEY_ID, keySecret: env.RAZORPAY_KEY_SECRET, webhookSecret: env.RAZORPAY_WEBHOOK_SECRET }) }));
        mountCatalogue(app, db);
        app.use((error,req,res,next)=>{void error;void next;res.status(503).set('Cache-Control','no-store').json({ message: 'Service temporarily unavailable. Please try again.' });});
        database = db; cachedApp = app; return app;
      } catch (error) { await db.connection.close(); throw error; }
    })().catch(error=>{retryAt=Date.now()+retryDelayMs;throw error;}).finally(()=>{initializing=null;});
    return initializing;
  }
  return async (req,res) => {
    const started = performance.now();
    try {
      const app = await initialize();
      res.setHeader('Server-Timing', `init;dur=${(performance.now()-started).toFixed(1)}`);
      if (database.connection.readyState !== 1) throw new Error('Service unavailable');
      return app(req,res);
    } catch {
      res.setHeader('Server-Timing', `init;dur=${(performance.now()-started).toFixed(1)}`);
      res.statusCode = 503; res.setHeader('Content-Type','application/json'); res.setHeader('Cache-Control','no-store'); res.setHeader('Retry-After','1');
      return res.end(JSON.stringify({ message: 'Service temporarily unavailable. Please try again.' }));
    }
  };
}
module.exports = createHandler();
module.exports.createHandler = createHandler;
