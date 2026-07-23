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
    if (config.env !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = { connectDB };
