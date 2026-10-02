const Redis = require('ioredis');
const config = require('../config');
const logger = require('./logger');

let redis;

if (config.env === 'test') {
  try {
    const RedisMock = require('ioredis-mock');
    redis = new RedisMock();
    logger.info('Redis connection: Mock initialized for testing.');
  } catch (err) {
    redis = new Redis(config.redis.uri, {
      maxRetriesPerRequest: null,
    });
  }
} else {
  redis = new Redis(config.redis.uri, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
    retryStrategy(times) {
      if (times > 3) {
        logger.warn('Redis connection unreachable. Running with offline cache fallback for dev.');
        return null;
      }
      return Math.min(times * 100, 1000);
    },
  });

  redis.on('connect', () => {
    logger.info('Redis connected successfully.');
  });

  redis.on('error', (err) => {
    // Suppress unhandled error log bursts when Redis server is offline locally
  });
}

module.exports = redis;
