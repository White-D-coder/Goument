const { body } = require('express-validator');

const createReviewValidation = [
  body('productId').isMongoId().withMessage('Invalid product ID.'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5.'),
  body('title').optional().trim().isLength({ max: 200 }).withMessage('Title must be at most 200 characters long.'),
  body('body').optional().trim().isLength({ max: 2000 }).withMessage('Body must be at most 2000 characters long.')
];

module.exports = {
  createReviewValidation
};
