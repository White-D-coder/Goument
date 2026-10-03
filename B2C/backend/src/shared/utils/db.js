const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoose.uri);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    if (config.env === 'production') {
      process.exit(1);
    }
    logger.warn('Continuing HTTP server startup in development mode...');
  }
};

module.exports = { connectDB };
