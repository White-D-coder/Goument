const { Worker } = require('bullmq');
const redis = require('../../shared/utils/redis');
const Order = require('./order.model');
const Product = require('../product/product.model');
const logger = require('../../shared/utils/logger');
const { INVENTORY_RELEASE_QUEUE } = require('../../shared/utils/bullQueue');

/**
 * Initializes the BullMQ worker for inventory release.
 */
const initOrderWorker = () => {
  const worker = new Worker(
    INVENTORY_RELEASE_QUEUE,
    async (job) => {
      const { orderId } = job.data;
      logger.info(`Worker: Checking stock release eligibility for Order: ${orderId}`);

      const order = await Order.findById(orderId);
      if (!order) {
        logger.warn(`Worker: Order ${orderId} not found in database.`);
        return;
      }

      // Re-validate state. If paid or processing, skip release
      if (order.status !== 'pending') {
        logger.info(`Worker: Order ${orderId} status is '${order.status}'. Release skipped.`);
        return;
      }

      // Revert product/variant inventory atomically
      for (const item of order.items) {
        try {
          if (item.variant && item.variant.sku) {
            await Product.findOneAndUpdate(
              { _id: item.product, 'variants.sku': item.variant.sku },
              { $inc: { 'variants.$[elem].inventory': item.quantity } },
              {
                arrayFilters: [{ 'elem.sku': item.variant.sku }],
                new: true
              }
            );
            logger.info(`Worker: Restored variant stock: SKU ${item.variant.sku} +${item.quantity}`);
          } else {
            await Product.findOneAndUpdate(
              { _id: item.product },
              { $inc: { inventory: item.quantity } },
              { new: true }
            );
            logger.info(`Worker: Restored product stock: ID ${item.product} +${item.quantity}`);
          }
        } catch (err) {
          logger.error(`Worker: Failed to restore stock for item ${item.product}: ${err.message}`);
        }
      }

      order.status = 'expired';
      await order.save();
      logger.info(`Worker: Order ${orderId} marked as 'expired' due to checkout timeout.`);
    },
    {
      connection: redis
    }
  );

  worker.on('failed', (job, err) => {
    logger.error(`Worker: Job ${job.id} failed with error: ${err.message}`);
  });

  return worker;
};

module.exports = { initOrderWorker };
