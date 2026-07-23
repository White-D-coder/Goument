const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./auth.model');
const config = require('../../shared/config');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

/**
 * Hash a token string using SHA256.
 * @param {string} token
 * @returns {string} Hashed hex string
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Generates an Access Token (short-lived) and a Refresh Token (JWT, long-lived).
 * Stores the hashed refresh token in the User profile.
 * @param {User} user
 * @returns {Promise<Object>} Object containing accessToken and refreshToken
 */
const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiration }
  );

  const refreshToken = jwt.sign(
    { id: user._id, jti: crypto.randomBytes(16).toString('hex') },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiration }
  );

  const tokenHash = hashToken(refreshToken);
  const decoded = jwt.decode(refreshToken);
  const expiresAt = new Date(decoded.exp * 1000);

  // Prune expired tokens before adding new one to keep doc size small
  const activeTokens = user.refreshTokens.filter((t) => t.expiresAt > new Date());
  user.refreshTokens = activeTokens;
  user.markModified('refreshTokens');

  user.refreshTokens.push({ tokenHash, expiresAt });
  await user.save();

  return { accessToken, refreshToken };
};

/**
 * Register a new user
 * @param {Object} userData
 */
const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new APIError(400, 'This email address is already registered.');
  }

  const user = new User({
    email: userData.email,
    passwordHash: userData.password,
    name: userData.name,
    phone: userData.phone,
    role: userData.role || 'customer'
  });

  await user.save();
  return generateTokens(user);
};

/**
 * Login user
 * @param {string} email
 * @param {string} password
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new APIError(401, 'Invalid email or password credentials.');
  }

  return generateTokens(user);
};

/**
 * Rotate refresh tokens and issue a new access token.
 * Triggers reuse detection if token is reused.
 * @param {string} incomingRefreshToken
 */
const refreshAccessToken = async (incomingRefreshToken) => {
  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, config.jwt.refreshSecret);
  } catch (err) {
    throw new APIError(401, 'Invalid or expired refresh token.');
  }

  const tokenHash = hashToken(incomingRefreshToken);
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new APIError(401, 'User associated with this token no longer exists.');
  }

  // Check if token hash is present in active refreshTokens
  const isTokenActive = user.refreshTokens.some((t) => t.tokenHash === tokenHash);

  if (!isTokenActive) {
    // REUSE DETECTION: Token was already rotated or revoked.
    // Revoke all tokens for security, forcing complete re-authentication
    user.refreshTokens = [];
    await user.save();
    throw new APIError(401, 'Token reuse detected. All sessions revoked. Please log in again.');
  }

  // Check if token has expired
  const storedToken = user.refreshTokens.find((t) => t.tokenHash === tokenHash);
  if (storedToken.expiresAt < new Date()) {
    user.refreshTokens.pull(storedToken._id);
    await user.save();
    throw new APIError(401, 'Refresh token has expired.');
  }

  // Rotate token: Remove used token, generate new set
  user.refreshTokens.pull(storedToken._id);
  return generateTokens(user);
};

/**
 * Revokes a refresh token during logout
 * @param {string} incomingRefreshToken
 */
const logout = async (incomingRefreshToken) => {
  try {
    const decoded = jwt.verify(incomingRefreshToken, config.jwt.refreshSecret);
    const tokenHash = hashToken(incomingRefreshToken);
    const user = await User.findById(decoded.id);

    if (user) {
      const storedToken = user.refreshTokens.find((t) => t.tokenHash === tokenHash);
      if (storedToken) {
        user.refreshTokens.pull(storedToken._id);
        await user.save();
      }
    }
  } catch (error) {
    // Fail silently on invalid tokens during logout
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout
};
