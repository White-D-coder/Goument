const express = require('express');
const adminController = require('./admin.controller');
const { auth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

// Enforce admin permission policy globally for all routes in this feature folder
router.use(auth('admin'));

router.get('/stats', adminController.getAdminStats);
router.get('/orders', adminController.getAdminOrders);

module.exports = router;
