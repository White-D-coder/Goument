const mongoose = require('mongoose');
const redis = require('../../shared/utils/redis');

/**
 * Health check handler verifying primary database and cache connections.
 */
const checkHealth = async (req, res) => {
  const healthInfo = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      mongodb: 'disconnected',
      redis: 'disconnected'
    }
  };

  let healthy = true;

  // Verify Mongoose Status
  if (mongoose.connection.readyState === 1) {
    healthInfo.services.mongodb = 'connected';
  } else {
    healthInfo.services.mongodb = 'disconnected';
    healthy = false;
  }

  // Verify Redis Status
  try {
    const pingResponse = await redis.ping();
    if (pingResponse === 'PONG') {
      healthInfo.services.redis = 'connected';
    } else {
      healthInfo.services.redis = 'degraded';
      healthy = false;
    }
  } catch (error) {
    healthInfo.services.redis = 'error';
    healthy = false;
  }

  const statusCode = healthy ? 200 : 503;
  return res.status(statusCode).json({
    success: healthy,
    ...healthInfo
  });
};

module.exports = {
  checkHealth
};
