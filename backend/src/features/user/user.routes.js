const express = require('express');
const userController = require('./user.controller');
const { auth } = require('../../shared/middleware/auth.middleware');
const { body } = require('express-validator');
const validate = require('../../shared/middleware/validation.middleware');

const router = express.Router();

const addressValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.'),
  body('line1').trim().notEmpty().withMessage('Address line 1 is required.'),
  body('city').trim().notEmpty().withMessage('City is required.'),
  body('state').trim().notEmpty().withMessage('State is required.'),
  body('postalCode').trim().notEmpty().withMessage('Postal code is required.'),
  body('country').trim().notEmpty().withMessage('Country is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.')
];

// All user endpoints require user authentication
router.use(auth());

router.get('/profile', userController.getProfile);
router.post('/addresses', addressValidation, validate, userController.addAddress);
router.put('/addresses/:addressId', addressValidation, validate, userController.updateAddress);
router.delete('/addresses/:addressId', userController.deleteAddress);

module.exports = router;
