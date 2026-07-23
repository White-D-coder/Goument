const cartService = require('./cart.service');

const parseContext = (req) => {
  const userId = req.user ? req.user._id.toString() : null;
  const sessionId = req.headers['x-session-id'] || (req.cookies && req.cookies.sessionId);
  return { userId, sessionId };
};

const getCart = async (req, res, next) => {
  try {
    const { userId, sessionId } = parseContext(req);
    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'User ID or Session ID is required.' });
    }
    const cart = await cartService.getCart(userId, sessionId);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = parseContext(req);
    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'User ID or Session ID is required.' });
    }
    const cart = await cartService.addItemToCart(userId, sessionId, req.body);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = parseContext(req);
    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'User ID or Session ID is required.' });
    }
    const cart = await cartService.updateCartItem(userId, sessionId, req.params.itemId, req.body);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = parseContext(req);
    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'User ID or Session ID is required.' });
    }
    const cart = await cartService.deleteCartItem(userId, sessionId, req.params.itemId);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const { userId, sessionId } = parseContext(req);
    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'User ID or Session ID is required.' });
    }
    await cartService.clearCart(userId, sessionId);
    return res.status(200).json({ success: true, message: 'Cart cleared successfully.' });
  } catch (error) {
    return next(error);
  }
};

const syncCart = async (req, res, next) => {
  try {
    const { userId, sessionId } = parseContext(req);
    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'User ID or Session ID is required.' });
    }
    const forceClient = req.body.forceClient || req.body.force || false;
    const cart = await cartService.syncCart(userId, sessionId, req.body.items, forceClient);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  deleteItem,
  clearCart,
  syncCart
};
