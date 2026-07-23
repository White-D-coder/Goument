const express = require('express');
const categoryController = require('./category.controller');
const { createCategoryValidation, updateCategoryValidation } = require('./category.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { auth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

router.get('/', categoryController.getCategoryTree);
router.get('/:slug', categoryController.getCategoryBySlug);

// Admin-only creation/updating endpoints
router.post('/', auth('admin'), createCategoryValidation, validate, categoryController.createCategory);
router.put('/:id', auth('admin'), updateCategoryValidation, validate, categoryController.updateCategory);

module.exports = router;
