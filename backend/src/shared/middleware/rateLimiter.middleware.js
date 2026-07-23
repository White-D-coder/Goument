const redis = require('../utils/redis');
const logger = require('../utils/logger');

/**
 * Creates an Express rate limiting middleware.
 * @param {Object} options - Configurations
 * @param {number} options.windowMs - Time window in milliseconds (default 1 min)
 * @param {number} options.max - Maximum requests per IP during windowMs
 * @param {string} options.message - Error message to return
 */
const rateLimiter = (options = {}) => {
  const {
    windowMs = 60000, // 1 minute
    max = 100, // max 100 requests per minute by default
    message = 'Too many requests from this IP. Please try again after some time.'
  } = options;

  return async (req, res, next) => {
    // Skip rate limiting in test environments
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const key = `ratelimit:${ip}`;

    try {
      const currentRequests = await redis.get(key);

      if (currentRequests && parseInt(currentRequests, 10) >= max) {
        return res.status(429).json({
          success: false,
          message
        });
      }

      if (!currentRequests) {
        // Create key with TTL matching the remaining window size
        await redis.set(key, 1, 'PX', windowMs);
      } else {
        await redis.incr(key);
      }

      next();
    } catch (error) {
      logger.error('Rate limiting Redis error: ', error);
      // Fail-safe: do not crash client request flow if cache server is down
      next();
    }
  };
};

module.exports = rateLimiter;
