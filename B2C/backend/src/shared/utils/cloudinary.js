const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

/**
 * Generates a signed upload signature for direct client-side upload.
 * @param {Object} params - Parameters to sign (e.g. folder, public_id).
 * @returns {Object} Signed signature payload
 */
const generateSignature = (params = {}) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signParams = { ...params, timestamp };
  const signature = cloudinary.utils.api_sign_request(signParams, config.cloudinary.apiSecret);

  return {
    signature,
    timestamp,
    apiKey: config.cloudinary.apiKey,
    cloudName: config.cloudinary.cloudName
  };
};

module.exports = {
  cloudinary,
  generateSignature
};
