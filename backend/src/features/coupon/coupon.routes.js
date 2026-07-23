const express = require('express');
const couponController = require('./coupon.controller');
const { createCouponValidation } = require('./coupon.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { auth, optionalAuth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

router.get('/validate', optionalAuth, couponController.validateCouponCode);

// Admin administrative endpoints
router.post('/', auth('admin'), createCouponValidation, validate, couponController.createCoupon);
router.get('/', auth('admin'), couponController.getCoupons);

module.exports = router;
