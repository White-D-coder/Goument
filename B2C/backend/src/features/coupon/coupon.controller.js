const couponService = require('./coupon.service');
const cartService = require('../cart/cart.service');
const Product = require('../product/product.model');

const createCoupon = async (req, res, next) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    return res.status(201).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    return next(error);
  }
};

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await couponService.getAllCoupons();
    return res.status(200).json({
      success: true,
      data: coupons
    });
  } catch (error) {
    return next(error);
  }
};

const validateCouponCode = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code is required.'
      });
    }

    // Resolve context for the cart
    const userId = req.user ? req.user._id.toString() : null;
    const sessionId = req.headers['x-session-id'] || (req.cookies && req.cookies.sessionId);

    if (!userId && !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'User ID or Session ID is required.'
      });
    }

    const cart = await cartService.getCart(userId, sessionId);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty.'
      });
    }

    // Snapshot cart items and calculate actual subtotal from DB to avoid client-side spoofing
    let subtotal = 0;
    const itemsSnapshot = [];

    for (const item of cart.items) {
      const product = await Product.findOne({ _id: item.productId, isActive: true });
      if (!product) continue;

      let itemPrice = product.basePrice;
      if (item.variantSku) {
        const variant = product.variants.find((v) => v.sku === item.variantSku);
        if (variant && variant.price) {
          itemPrice = variant.price;
        }
      }

      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      itemsSnapshot.push({
        productId: item.productId,
        categories: product.categories,
        totalPrice: itemTotal,
        quantity: item.quantity
      });
    }

    const { coupon, discountAmount } = await couponService.validateCoupon(code, subtotal, itemsSnapshot);

    return res.status(200).json({
      success: true,
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discountAmount,
        minPurchase: coupon.minPurchase
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  validateCouponCode
};
