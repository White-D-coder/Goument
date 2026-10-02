const { body } = require('express-validator');

const placeOrderValidation = [
  body('shippingAddress').isObject().withMessage('Shipping address is required.'),
  body('shippingAddress.fullName').trim().notEmpty().withMessage('Shipping full name is required.'),
  body('shippingAddress.line1').trim().notEmpty().withMessage('Shipping line 1 is required.'),
  body('shippingAddress.city').trim().notEmpty().withMessage('Shipping city is required.'),
  body('shippingAddress.state').trim().notEmpty().withMessage('Shipping state is required.'),
  body('shippingAddress.postalCode').trim().notEmpty().withMessage('Shipping postal code is required.'),
  body('shippingAddress.country').trim().notEmpty().withMessage('Shipping country is required.'),
  body('shippingAddress.phone').trim().notEmpty().withMessage('Shipping phone number is required.'),

  body('billingAddress').isObject().withMessage('Billing address is required.'),
  body('billingAddress.fullName').trim().notEmpty().withMessage('Billing full name is required.'),
  body('billingAddress.line1').trim().notEmpty().withMessage('Billing line 1 is required.'),
  body('billingAddress.city').trim().notEmpty().withMessage('Billing city is required.'),
  body('billingAddress.state').trim().notEmpty().withMessage('Billing state is required.'),
  body('billingAddress.postalCode').trim().notEmpty().withMessage('Billing postal code is required.'),
  body('billingAddress.country').trim().notEmpty().withMessage('Billing country is required.'),
  body('billingAddress.phone').trim().notEmpty().withMessage('Billing phone number is required.'),

  body('couponCode').optional().trim().notEmpty().withMessage('Coupon code cannot be empty.'),
  body('recipient').optional().isObject().withMessage('Recipient details must be an object.'),
  body('recipient.name').optional().trim().notEmpty().withMessage('Recipient name cannot be empty.'),
  body('recipient.phone').optional().trim().notEmpty().withMessage('Recipient phone cannot be empty.'),
  body('recipient.email').optional().isEmail().withMessage('Recipient email must be a valid email address.'),
  body('requestedDeliveryDate').optional().isISO8601().toDate().withMessage('Requested delivery date must be a valid ISO8601 date format.')
];

module.exports = {
  placeOrderValidation
};
