const express = require('express');
const { checkHealth } = require('./health.controller');

const router = express.Router();

router.get('/healthz', checkHealth);

module.exports = router;
