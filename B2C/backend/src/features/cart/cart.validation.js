const { body, param } = require('express-validator');

const addItemValidation = [
  body('productId').isMongoId().withMessage('Invalid product ID.'),
  body('variantSku').optional().trim().notEmpty().withMessage('Variant SKU must be a non-empty string.'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
  body('giftBoxing').optional().isObject().withMessage('giftBoxing must be an object.'),
  body('giftBoxing.type').optional().isIn(['classics', 'royale-tin', 'premium-velvet']).withMessage('Invalid gift box type.'),
  body('giftBoxing.surcharge').optional().isInt({ min: 0 }).withMessage('Surcharge must be non-negative.')
];

const updateItemValidation = [
  param('itemId').trim().notEmpty().withMessage('Item ID parameter (productId or variantSku) is required.'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
  body('giftBoxing').optional().isObject().withMessage('giftBoxing must be an object.'),
  body('giftBoxing.type').optional().isIn(['classics', 'royale-tin', 'premium-velvet']).withMessage('Invalid gift box type.'),
  body('giftBoxing.surcharge').optional().isInt({ min: 0 }).withMessage('Surcharge must be non-negative.')
];

const syncCartValidation = [
  body('items').isArray().withMessage('Items must be a valid array.'),
  body('items.*.productId').isMongoId().withMessage('Invalid product ID in items list.'),
  body('items.*.variantSku').optional().trim().notEmpty().withMessage('Variant SKU cannot be empty.'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1 in items list.'),
  body('force').optional().isBoolean().withMessage('Force parameter must be a boolean.')
];

module.exports = {
  addItemValidation,
  updateItemValidation,
  syncCartValidation
};
