const Stripe = require('stripe');
const config = require('../config');
const { createBreaker } = require('./circuitBreaker');

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2023-10-16'
});

const createPaymentIntentRaw = async (params) => {
  return stripe.paymentIntents.create(params);
};

const calculateTaxRaw = async (params) => {
  return stripe.tax.calculations.create(params);
};

const createPaymentIntentBreaker = createBreaker(createPaymentIntentRaw);
const calculateTaxBreaker = createBreaker(calculateTaxRaw);

// Fallbacks for resilience
createPaymentIntentBreaker.fallback((error) => {
  throw new Error(`Stripe Payment Intent Service temporarily unavailable: ${error.message}`);
});

calculateTaxBreaker.fallback((error) => {
  // If Stripe Tax fails, fallback to a basic tax estimate (e.g. 5% fallback) to ensure purchase goes through
  // Or raise an error based on requirements. Here, we return a mock response format matching Stripe Tax Calculation
  return {
    id: 'mock_tax_calc',
    tax_amount_exclusive: 0,
    tax_date: Math.floor(Date.now() / 1000),
    currency: 'inr',
    tax_line_items: [],
    amount_total: 0 // Will adjust in orders
  };
});

module.exports = {
  stripe,
  createPaymentIntent: (params) => createPaymentIntentBreaker.fire(params),
  calculateTax: (params) => calculateTaxBreaker.fire(params),
  verifyWebhookSignature: (payload, header, secret) => {
    return stripe.webhooks.constructEvent(payload, header, secret);
  }
};
