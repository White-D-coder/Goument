const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../../features/auth/auth.model');
const logger = require('../utils/logger');

/**
 * Authentication middleware to guard routes.
 * @param {...string} roles - Allowed roles (e.g. 'admin', 'customer')
 */
const auth = (...roles) => async (req, res, next) => {
  try {
    let token;

    // Check authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Fallback to cookie check
    else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.accessSecret);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired access token.'
      });
    }

    // Locate the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. User no longer exists.'
      });
    }

    // Validate role authorizations if specific roles are required
    if (roles.length > 0 && !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden. You do not have the required permissions.'
      });
    }

    // Attach user information to request context
    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication Middleware Error:', error);
    next(error);
  }
};

/**
 * Optional authentication middleware.
 * Attempts to parse user from token, but does not block request if missing or invalid.
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = jwt.verify(token, config.jwt.accessSecret);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // Proceed as guest if token is invalid or expired
    next();
  }
};

module.exports = {
  auth,
  optionalAuth
};

