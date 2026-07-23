const express = require('express');
const cartController = require('./cart.controller');
const { addItemValidation, updateItemValidation, syncCartValidation } = require('./cart.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { optionalAuth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

// Apply optional auth to resolve user vs guest cart context automatically
router.use(optionalAuth);

router.get('/', cartController.getCart);
router.post('/items', addItemValidation, validate, cartController.addItem);
router.patch('/items/:itemId', updateItemValidation, validate, cartController.updateItem);
router.delete('/items/:itemId', cartController.deleteItem);
router.delete('/', cartController.clearCart);
router.post('/sync', syncCartValidation, validate, cartController.syncCart);

module.exports = router;
