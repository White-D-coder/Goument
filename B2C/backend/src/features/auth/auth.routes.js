const express = require('express');
const authController = require('./auth.controller');
const { registerValidation, loginValidation } = require('./auth.validation');
const validate = require('../../shared/middleware/validation.middleware');
const { auth } = require('../../shared/middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', auth(), authController.getMe);

module.exports = router;
