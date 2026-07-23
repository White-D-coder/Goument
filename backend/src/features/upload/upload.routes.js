const express = require('express');
const uploadController = require('./upload.controller');
const { auth } = require('../../shared/middleware/auth.middleware');
const { body } = require('express-validator');
const validate = require('../../shared/middleware/validation.middleware');

const router = express.Router();

router.post(
  '/sign',
  auth('admin'),
  body('folder').trim().notEmpty().withMessage('Folder destination is required.'),
  validate,
  uploadController.signUpload
);

module.exports = router;
