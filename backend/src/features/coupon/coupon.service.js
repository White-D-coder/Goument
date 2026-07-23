const Coupon = require('./coupon.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const createCoupon = async (couponData) => {
  const code = couponData.code.toUpperCase();
  const existing = await Coupon.findOne({ code });
  if (existing) {
    throw new APIError(400, `Coupon with code ${code} already exists.`);
  }

  const coupon = new Coupon({
    ...couponData,
    code
  });
  await coupon.save();
  return coupon;
};

const getAllCoupons = async () => {
  return Coupon.find().sort({ createdAt: -1 });
};

/**
 * Validates a coupon code against a cart and returns the computed discount amount in paise.
 * @param {string} code
 * @param {number} cartSubtotal - Cart subtotal in paise
 * @param {Array} cartItems - Snapshot of cart items with productId, categories, and item total price
 */
const validateCoupon = async (code, cartSubtotal, cartItems = []) => {
  if (!code) {
    throw new APIError(400, 'Coupon code is required.');
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() })
    .populate('applicableProducts applicableCategories');

  if (!coupon || !coupon.isActive) {
    throw new APIError(404, 'Coupon code is invalid, inactive, or expired.');
  }

  const now = new Date();
  if (coupon.validFrom > now) {
    throw new APIError(400, 'This coupon is not active yet.');
  }
  if (coupon.validUntil < now) {
    throw new APIError(400, 'This coupon has expired.');
  }

  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
    throw new APIError(400, 'This coupon has reached its maximum usage limit.');
  }

  if (cartSubtotal < coupon.minPurchase) {
    throw new APIError(400, `Minimum purchase of ${(coupon.minPurchase / 100).toFixed(2)} INR is required to apply this coupon.`);
  }

  // Filter based on product or category limits if they exist
  const hasProductRestrictions = coupon.applicableProducts && coupon.applicableProducts.length > 0;
  const hasCategoryRestrictions = coupon.applicableCategories && coupon.applicableCategories.length > 0;

  if (hasProductRestrictions || hasCategoryRestrictions) {
    let eligibleSubtotal = 0;

    cartItems.forEach((item) => {
      let eligible = false;

      if (hasProductRestrictions) {
        const matchesProduct = coupon.applicableProducts.some(
          (p) => p._id.toString() === item.productId.toString()
        );
        if (matchesProduct) eligible = true;
      }

      if (!eligible && hasCategoryRestrictions && item.categories) {
        const matchesCategory = coupon.applicableCategories.some((c) =>
          item.categories.some((catId) => catId.toString() === c._id.toString())
        );
        if (matchesCategory) eligible = true;
      }

      if (eligible) {
        eligibleSubtotal += item.totalPrice; // Price * Quantity in paise
      }
    });

    if (eligibleSubtotal === 0) {
      throw new APIError(400, 'This coupon is not applicable to any of the products in your cart.');
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = Math.round((eligibleSubtotal * coupon.value) / 100);
    } else {
      discount = Math.min(coupon.value, eligibleSubtotal);
    }

    return { coupon, discountAmount: discount };
  }

  // General coupon applies to the entire cart subtotal
  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = Math.round((cartSubtotal * coupon.value) / 100);
  } else {
    discount = Math.min(coupon.value, cartSubtotal);
  }

  return { coupon, discountAmount: discount };
};

const incrementUsage = async (couponId) => {
  return Coupon.findByIdAndUpdate(couponId, { $inc: { usedCount: 1 } }, { new: true });
};

module.exports = {
  createCoupon,
  getAllCoupons,
  validateCoupon,
  incrementUsage
};
