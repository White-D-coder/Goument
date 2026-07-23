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
      maxRetriesPerRequest: null
    });
    logger.info('Redis connection: Real connection initialized for testing.');
  }
} else {
  redis = new Redis(config.redis.uri, {
    maxRetriesPerRequest: null
  });

  redis.on('connect', () => {
    logger.info('Redis connected successfully.');
  });

  redis.on('error', (err) => {
    logger.error('Redis connection error:', err);
  });
}

module.exports = redis;
