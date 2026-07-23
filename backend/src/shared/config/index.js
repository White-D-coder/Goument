const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Load environment variables from .env file at workspace root
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const isTest = process.env.NODE_ENV === 'test';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    PORT: Joi.number().default(5000),
    MONGODB_URI: isTest ? Joi.string().default('mongodb://127.0.0.1:27017/gourmetgem-test') : Joi.string().required().description('MongoDB connection URI'),
    REDIS_URI: Joi.string().default('redis://127.0.0.1:6379').description('Redis connection URI'),
    JWT_ACCESS_SECRET: isTest ? Joi.string().default('test_jwt_access_secret_key_12345') : Joi.string().required().description('JWT access token secret key'),
    JWT_REFRESH_SECRET: isTest ? Joi.string().default('test_jwt_refresh_secret_key_12345') : Joi.string().required().description('JWT refresh token secret key'),
    JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
    JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
    CLOUDINARY_CLOUD_NAME: isTest ? Joi.string().default('test_cloudinary_cloud_name') : Joi.string().required().description('Cloudinary Cloud Name'),
    CLOUDINARY_API_KEY: isTest ? Joi.string().default('test_cloudinary_api_key') : Joi.string().required().description('Cloudinary API Key'),
    CLOUDINARY_API_SECRET: isTest ? Joi.string().default('test_cloudinary_api_secret') : Joi.string().required().description('Cloudinary API Secret'),
    STRIPE_SECRET_KEY: isTest ? Joi.string().default('sk_test_mock') : Joi.string().required().description('Stripe Secret Key'),
    STRIPE_WEBHOOK_SECRET: isTest ? Joi.string().default('whsec_mock') : Joi.string().required().description('Stripe Webhook Secret'),
    SENTRY_DSN: Joi.string().allow('').default(''),
    LOGTAIL_TOKEN: Joi.string().allow('').default('')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    uri: envVars.MONGODB_URI
  },
  redis: {
    uri: envVars.REDIS_URI
  },
  jwt: {
    accessSecret: envVars.JWT_ACCESS_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    accessExpiration: envVars.JWT_ACCESS_EXPIRES_IN,
    refreshExpiration: envVars.JWT_REFRESH_EXPIRES_IN
  },
  cloudinary: {
    cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_API_SECRET
  },
  stripe: {
    secretKey: envVars.STRIPE_SECRET_KEY,
    webhookSecret: envVars.STRIPE_WEBHOOK_SECRET
  },
  monitoring: {
    sentryDsn: envVars.SENTRY_DSN,
    logtailToken: envVars.LOGTAIL_TOKEN
  }
};
