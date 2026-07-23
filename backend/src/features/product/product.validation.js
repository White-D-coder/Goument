const { body } = require('express-validator');

const createProductValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required.'),
  body('description.short').trim().notEmpty().withMessage('Short description is required.'),
  body('basePrice').isInt({ min: 1 }).withMessage('Base price must be a positive integer representing paise.'),
  body('sku').optional().trim().notEmpty().withMessage('SKU must be a non-empty string.'),
  body('inventory').optional().isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer.'),
  body('categories').isArray({ min: 1 }).withMessage('At least one category ID is required.').custom((val) => {
    return val.every((id) => /^[0-9a-fA-F]{24}$/.test(id));
  }).withMessage('Each category must be a valid Mongo ObjectId.')
];

const updateProductValidation = [
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty.'),
  body('description.short').optional().trim().notEmpty().withMessage('Short description cannot be empty.'),
  body('basePrice').optional().isInt({ min: 1 }).withMessage('Base price must be a positive integer representing paise.'),
  body('sku').optional().trim().notEmpty().withMessage('SKU must be a non-empty string.'),
  body('inventory').optional().isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer.'),
  body('categories').optional().isArray().withMessage('Categories must be an array of ObjectIds.')
];

module.exports = {
  createProductValidation,
  updateProductValidation
};
