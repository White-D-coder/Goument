const http = require('http');
const app = require('./app');
const config = require('./shared/config');
const { connectDB } = require('./shared/utils/db');
const redis = require('./shared/utils/redis');
const { initSocket } = require('./shared/utils/socket');
const { initOrderWorker } = require('./features/order/order.worker');
const logger = require('./shared/utils/logger');
const mongoose = require('mongoose');

let server;
let orderWorker;

const startServer = async () => {
  try {
    // 1. Wrap Express instance in HTTP server
    server = http.createServer(app);

    // 2. Open port listener first so health checks and API routes are live
    server.listen(config.port, () => {
      logger.info(`Startup: Server running on port ${config.port} inside '${config.env}' environment.`);
    });

    // 3. Establish database connection asynchronously
    connectDB().catch((err) => {
      logger.warn('MongoDB connection pending in local dev mode.');
    });

    // 4. Initialize Socket.io server with Redis Adapter scaling
    try {
      initSocket(server);
      logger.info('Startup: Socket.io server initialized.');
    } catch (err) {
      logger.warn('Socket.io pending Redis adapter in local dev mode.');
    }

    // 5. Spin up BullMQ workers for background stock replenishment
    if (config.env !== 'test') {
      try {
        orderWorker = initOrderWorker();
        logger.info('Startup: BullMQ Order Worker initialized.');
      } catch (err) {
        logger.warn('Order Worker pending Redis connection.');
      }
    }
  } catch (error) {
    logger.error('Startup Error: System startup aborted.', error);
  }
};

/**
 * Handles cleaning up system states upon process termination.
 */
const gracefulShutdown = async (signal) => {
  logger.info(`Shutdown: Received ${signal}. Starting graceful shutdown procedure...`);

  if (server) {
    server.close(() => {
      logger.info('Shutdown: HTTP server closed.');
    });
  }

  if (orderWorker) {
    try {
      await orderWorker.close();
    } catch (err) {}
    logger.info('Shutdown: BullMQ worker terminated.');
  }

  try {
    await mongoose.connection.close();
  } catch (err) {}

  try {
    await redis.quit();
  } catch (err) {}

  logger.info('Shutdown: Graceful shutdown complete. Exiting.');
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
