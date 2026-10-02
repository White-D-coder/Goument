const cartService = require('./cart.service');
const Product = require('../product/product.model');

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
    const products = await Product.find({ _id: { $in: cart.items.map((item) => item.productId) } })
      .select('name slug basePrice currency inventory isActive variants images').lean();
    const byId = new Map(products.map((product) => [String(product._id), product]));
    const items = cart.items.map((item) => {
      const product = byId.get(item.productId);
      const variant = product?.variants.find((value) => value.sku === item.variantSku);
      const available = Boolean(product?.isActive && (!item.variantSku || variant)
        && (variant?.inventory ?? product.inventory) >= item.quantity);
      return {
        ...item,
        name: product?.name || 'Unavailable gift',
        slug: product?.slug,
        variantName: variant?.name,
        unitPrice: product ? (variant?.price ?? product.basePrice) : null,
        currency: product?.currency || 'INR',
        available
      };
    });
    return res.status(200).json({ success: true, data: { items } });
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
