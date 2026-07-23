const express = require('express');
const reviewController = require('./review.controller');
const { createReviewValidation } = require('./review.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { auth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

router.get('/:productId', reviewController.getReviews);

// Authenticated user submission
router.post('/', auth(), createReviewValidation, validate, reviewController.createReview);

// Admin administrative approvals
router.patch('/:id/approve', auth('admin'), reviewController.approveReview);

module.exports = router;
