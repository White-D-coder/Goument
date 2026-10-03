const authService = require('./auth.service');
const config = require('../../shared/config');

/**
 * Configure secure token cookies on the response.
 */
const setTokenCookies = (res, tokens) => {
  // Always use secure cookies for compatibility with cross-site requests (SameSite=None)
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  res.cookie('accessToken', tokens.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', tokens.refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

/**
 * Clear token cookies from response headers.
 */
const clearTokenCookies = (res) => {
  const clearOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };
  res.clearCookie('accessToken', clearOptions);
  res.clearCookie('refreshToken', clearOptions);
};

const register = async (req, res, next) => {
  try {
    const tokens = await authService.register(req.body);
    setTokenCookies(res, tokens);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully.'
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    setTokenCookies(res, tokens);
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.'
    });
  } catch (error) {
    return next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required.'
      });
    }

    const tokens = await authService.refreshAccessToken(incomingToken);
    setTokenCookies(res, tokens);
    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully.'
    });
  } catch (error) {
    // If refresh fails due to reuse detection, ensure client cookies are wiped
    clearTokenCookies(res);
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
    if (incomingToken) {
      await authService.logout(incomingToken);
    }
    clearTokenCookies(res);
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    // req.user is set by authentication middleware
    const { _id, email, name, role, phone, addresses } = req.user;
    return res.status(200).json({
      success: true,
      user: {
        id: _id,
        email,
        name,
        role,
        phone,
        addresses
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe
};
