const redis = require('../utils/redis');
const logger = require('../utils/logger');

/**
 * Idempotency check middleware.
 * Ensures POST requests with the same Idempotency-Key header are executed exactly once.
 */
const idempotency = async (req, res, next) => {
  // Idempotency check applies to non-safe methods, typically POST
  if (req.method !== 'POST') {
    return next();
  }

  const key = req.headers['idempotency-key'];
  if (!key) {
    return next();
  }

  const redisKey = `idempotency:${key}`;

  try {
    const cachedValue = await redis.get(redisKey);

    if (cachedValue) {
      const data = JSON.parse(cachedValue);

      if (data.status === 'processing') {
        return res.status(409).json({
          success: false,
          message: 'Another request with this Idempotency-Key is currently processing.'
        });
      }

      logger.info(`Idempotency: Returning cached response for key ${key}`);
      return res.status(data.statusCode).json(data.body);
    }

    // Set lock status with 2-minute TTL in case process crashes
    await redis.set(redisKey, JSON.stringify({ status: 'processing' }), 'EX', 120);

    // Capture original res.json to store the response payload
    const originalJson = res.json;
    res.json = function (body) {
      res.json = originalJson;

      // On successful status code range, store response for 24h
      if (res.statusCode >= 200 && res.statusCode < 300) {
        redis.set(
          redisKey,
          JSON.stringify({
            status: 'completed',
            statusCode: res.statusCode,
            body
          }),
          'EX',
          86400 // 24 hours
        ).catch((err) => logger.error(`Idempotency: Failed to cache response: ${err.message}`));
      } else {
        // On client/server errors, clear lock so they can retry
        redis.del(redisKey).catch((err) => logger.error(`Idempotency: Failed to delete lock key: ${err.message}`));
      }

      return originalJson.call(this, body);
    };

    next();
  } catch (error) {
    logger.error('Idempotency Middleware Error:', error);
    next(error);
  }
};

module.exports = idempotency;
