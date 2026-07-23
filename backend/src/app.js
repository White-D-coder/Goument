const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const { errorHandler } = require('./shared/middleware/errorHandler.middleware');
const rateLimiter = require('./shared/middleware/rateLimiter.middleware');

// Feature Routers
const authRoutes = require('./features/auth/auth.routes');
const userRoutes = require('./features/user/user.routes');
const productRoutes = require('./features/product/product.routes');
const categoryRoutes = require('./features/category/category.routes');
const giftBoxingRoutes = require('./features/giftBoxing/giftBoxing.routes');
const cartRoutes = require('./features/cart/cart.routes');
const orderRoutes = require('./features/order/order.routes');
const reviewRoutes = require('./features/review/review.routes');
const couponRoutes = require('./features/coupon/coupon.routes');
const uploadRoutes = require('./features/upload/upload.routes');
const adminRoutes = require('./features/admin/admin.routes');
const healthRoutes = require('./features/health/health.routes');

// Stripe webhook controller directly (needed for raw buffer verification)
const orderController = require('./features/order/order.controller');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", "https://api.stripe.com"]
    }
  }
}));

const corsOrigins = ['https://www.gourmetgem.com', 'https://m.gourmetgem.com', 'http://localhost:3000'];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id', 'Idempotency-Key']
}));

app.use(mongoSanitize());
app.use(cookieParser());

// General API Rate Limiting: 100 requests per IP per minute
app.use(rateLimiter({
  windowMs: 60000,
  max: 100,
  message: 'Too many requests from this IP. Please try again after some time.'
}));

// Route for Stripe Webhook before express.json() consumes the raw stream
app.post(
  '/api/v1/orders/webhook',
  express.raw({ type: 'application/json' }),
  orderController.handleStripeWebhook
);

// Standard JSON body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount feature routers under versioned namespaces
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/gift-boxing', giftBoxingRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/admin', adminRoutes);

// Health check endpoints mounted globally and inside api namespaces
app.use('/', healthRoutes);
app.use('/api/v1', healthRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
