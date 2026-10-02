const express = require('express');
const orderController = require('./order.controller');
const { placeOrderValidation } = require('./order.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { auth } = require('../../shared/middleware/auth.middleware');
const idempotency = require('../../shared/middleware/idempotency.middleware');

const router = express.Router();

// Stripe Webhook: needs raw buffer parsing to verify cryptographic signature
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  orderController.handleStripeWebhook
);

// Authenticated user endpoints
router.use(auth());

router.post(
  '/',
  idempotency,
  placeOrderValidation,
  validate,
  orderController.placeOrder
);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;
