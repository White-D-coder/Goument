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
    // 1. Establish database connection
    await connectDB();

    // 2. Wrap Express instance in HTTP server
    server = http.createServer(app);

    // 3. Initialize Socket.io server with Redis Adapter scaling
    initSocket(server);
    logger.info('Startup: Socket.io server initialized.');

    // 4. Spin up BullMQ workers for background stock replenishment
    if (config.env !== 'test') {
      orderWorker = initOrderWorker();
      logger.info('Startup: BullMQ Order Worker initialized.');
    }

    // 5. Open port listener
    server.listen(config.port, () => {
      logger.info(`Startup: Server running on port ${config.port} inside '${config.env}' environment.`);
    });
  } catch (error) {
    logger.error('Startup Error: System startup aborted.', error);
    process.exit(1);
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
    await orderWorker.close();
    logger.info('Shutdown: BullMQ worker terminated.');
  }

  try {
    await mongoose.connection.close();
    logger.info('Shutdown: Mongoose connection closed.');
  } catch (err) {
    logger.error('Shutdown Error: Mongoose closure failed:', err);
  }

  try {
    await redis.quit();
    logger.info('Shutdown: Redis connections terminated.');
  } catch (err) {
    logger.error('Shutdown Error: Redis closure failed:', err);
  }

  logger.info('Shutdown: Graceful shutdown complete. Exiting.');
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
