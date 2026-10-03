const Product = require('../product/product.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const GIFT_BOX_TYPES = [
  {
    type: 'classics',
    name: 'Classics Cardboard Gift Box',
    description: 'Elegant textured cardboard box with magnetic closure, silk ribbon, and personalized card.',
    surcharge: 50000, // 500 INR represented in paise
    heroImage: 'gift-boxing/classics/boxes'
  },
  {
    type: 'royale-tin',
    name: 'Royale Tin Keepsake Box',
    description: 'Gold-embossed vintage metal tin box, preserving freshness and offering a legacy keepsake.',
    surcharge: 80000, // 800 INR represented in paise
    heroImage: 'gift-boxing/royale-tin/boxes'
  },
  {
    type: 'premium-velvet',
    name: 'Premium Velvet Chest',
    description: 'Royal velvet-draped wooden chest with brass latches, offering the ultimate luxury presentation.',
    surcharge: 150000, // 1500 INR represented in paise
    heroImage: 'gift-boxing/premium-velvet/boxes'
  }
];

const getGiftBoxingTypes = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: GIFT_BOX_TYPES
    });
  } catch (error) {
    return next(error);
  }
};

const getProductsByBoxType = async (req, res, next) => {
  try {
    const { type } = req.params;
    if (!['classics', 'royale-tin', 'premium-velvet'].includes(type)) {
      throw new APIError(400, 'Invalid gift box type.');
    }

    const products = await Product.find({
      isActive: true,
      $or: [
        { giftBoxing: { $elemMatch: { type, available: true } } },
        { 'variants.giftBoxing': { $elemMatch: { type, available: true } } }
      ]
    });

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getGiftBoxingTypes,
  getProductsByBoxType
};
