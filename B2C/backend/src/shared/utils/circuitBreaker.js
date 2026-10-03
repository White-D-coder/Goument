const CircuitBreaker = require('opossum');
const logger = require('./logger');

/**
 * Creates an opossum Circuit Breaker wrapper.
 * @param {Function} action - The async function to guard.
 * @param {Object} options - Override parameters for the circuit breaker.
 * @returns {CircuitBreaker}
 */
const createBreaker = (action, options = {}) => {
  const defaultOptions = {
    timeout: 5000, // 5 seconds timeout
    errorThresholdPercentage: 50, // open if 50% of requests fail
    resetTimeout: 10000 // wait 10 seconds before attempting close
  };

  const breaker = new CircuitBreaker(action, { ...defaultOptions, ...options });

  breaker.on('open', () => logger.warn(`Circuit Breaker: Open for ${action.name || 'anonymous function'}`));
  breaker.on('close', () => logger.info(`Circuit Breaker: Closed (restored) for ${action.name || 'anonymous function'}`));
  breaker.on('halfOpen', () => logger.info(`Circuit Breaker: Half-Open for ${action.name || 'anonymous function'}`));
  breaker.on('fallback', (error) => logger.warn(`Circuit Breaker: Fallback triggered for ${action.name || 'anonymous function'} due to error: ${error.message}`));

  return breaker;
};

module.exports = { createBreaker };
