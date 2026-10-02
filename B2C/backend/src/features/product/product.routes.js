const express = require('express');
const productController = require('./product.controller');
const { createProductValidation, updateProductValidation } = require('./product.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { auth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/search/suggestions', productController.getSuggestions);
router.get('/:slug', productController.getProductBySlug);

// Admin-restricted routes
router.post('/', auth('admin'), createProductValidation, validate, productController.createProduct);
router.put('/:id', auth('admin'), updateProductValidation, validate, productController.updateProduct);
router.delete('/:id', auth('admin'), productController.deleteProduct);
router.patch('/:id/images', auth('admin'), productController.updateProductImages);

module.exports = router;
