const express = require('express');
const giftboxingController = require('./giftBoxing.controller');

const router = express.Router();

router.get('/', giftboxingController.getGiftBoxingTypes);
router.get('/:type/products', giftboxingController.getProductsByBoxType);

module.exports = router;
