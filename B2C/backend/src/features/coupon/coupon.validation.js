const { body } = require('express-validator');

const createCouponValidation = [
  body('code').trim().notEmpty().withMessage('Coupon code is required.'),
  body('type').isIn(['percentage', 'fixed']).withMessage('Type must be either "percentage" or "fixed".'),
  body('value').isInt({ min: 1 }).withMessage('Value must be a positive integer.'),
  body('minPurchase').optional().isInt({ min: 0 }).withMessage('minPurchase must be a non-negative integer representing paise.'),
  body('validFrom').optional().isISO8601().toDate().withMessage('validFrom must be a valid date format.'),
  body('validUntil').isISO8601().toDate().withMessage('validUntil must be a valid date format.'),
  body('maxUses').optional().isInt({ min: 0 }).withMessage('maxUses must be a non-negative integer.'),
  body('applicableProducts').optional().isArray().withMessage('applicableProducts must be a valid array.'),
  body('applicableCategories').optional().isArray().withMessage('applicableCategories must be a valid array.')
];

module.exports = {
  createCouponValidation
};
