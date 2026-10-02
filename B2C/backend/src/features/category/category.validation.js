const { body } = require('express-validator');

const createCategoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required.'),
  body('type').optional().isIn(['product_category', 'gift_box_section']).withMessage('Invalid category type.'),
  body('parent').optional().isMongoId().withMessage('Parent ID must be a valid Mongo ObjectId.'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer.'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value.')
];

const updateCategoryValidation = [
  body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty.'),
  body('type').optional().isIn(['product_category', 'gift_box_section']).withMessage('Invalid category type.'),
  body('parent').optional().isMongoId().withMessage('Parent ID must be a valid Mongo ObjectId.'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer.'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value.')
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation
};
