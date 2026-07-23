const orderService = require('./order.service');
const stripeUtils = require('../../shared/utils/stripe');
const config = require('../../shared/config');
const Order = require('./order.model');
const Coupon = require('../coupon/coupon.model');
const { inventoryQueue } = require('../../shared/utils/bullQueue');
const { notifyAdmins } = require('../../shared/utils/socket');
const logger = require('../../shared/utils/logger');

const placeOrder = async (req, res, next) => {
  try {
    const idempotencyKey = req.headers['idempotency-key'];
    if (!idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: 'Idempotency-Key header is required to complete checkout.'
      });
    }

    const result = await orderService.placeOrder(req.user._id, req.body, idempotencyKey);
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
    const result = await orderService.getOrdersByUser(req.user._id, page, limit);
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user._id, req.user.role);
    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return next(error);
  }
};

const handleStripeWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // req.body must be raw buffer for signature verification
    event = stripeUtils.verifyWebhookSignature(req.body, sig, config.stripe.webhookSecret);
  } catch (err) {
    logger.error(`Stripe Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Signature Error: ${err.message}`);
  }

  const paymentIntent = event.data.object;

  try {
    if (event.type === 'payment_intent.succeeded') {
      logger.info(`Stripe Webhook: payment_intent.succeeded for PI ${paymentIntent.id}`);

      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
      if (order && order.status === 'pending') {
        order.status = 'confirmed';
        await order.save();

        // 1. Cancel BullMQ delayed inventory release job
        const jobId = order._id.toString();
        const job = await inventoryQueue.getJob(jobId);
        if (job) {
          await job.remove();
          logger.info(`Stripe Webhook: Cancelled inventory-release BullMQ job for order ${order._id}`);
        }

        // 2. Increment coupon usedCount
        if (order.couponCode) {
          await Coupon.findOneAndUpdate(
            { code: order.couponCode },
            { $inc: { usedCount: 1 } }
          );
          logger.info(`Stripe Webhook: Incremented usedCount for coupon code ${order.couponCode}`);
        }

        // 3. Dispatch admin real-time notification via Socket.IO
        notifyAdmins('new_order', {
          orderId: order._id,
          total: order.total,
          recipient: order.recipient ? order.recipient.name : null
        });
      }
    } else if (
      event.type === 'payment_intent.payment_failed' ||
      event.type === 'payment_intent.canceled'
    ) {
      logger.info(`Stripe Webhook: Payment failed/cancelled for PI ${paymentIntent.id}`);

      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
      if (order && order.status === 'pending') {
        // Release inventory immediately
        await orderService.releaseInventoryForOrder(order._id);

        // Cancel BullMQ release job as it's no longer needed
        const jobId = order._id.toString();
        const job = await inventoryQueue.getJob(jobId);
        if (job) {
          await job.remove();
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    logger.error(`Stripe Webhook Processing Error: ${error.message}`);
    return next(error);
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  handleStripeWebhook
};
