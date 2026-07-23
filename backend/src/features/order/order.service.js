const mongoose = require('mongoose');
const Order = require('./order.model');
const Product = require('../product/product.model');
const cartService = require('../cart/cart.service');
const couponService = require('../coupon/coupon.service');
const stripeUtils = require('../../shared/utils/stripe');
const { inventoryQueue } = require('../../shared/utils/bullQueue');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');
const logger = require('../../shared/utils/logger');

/**
 * Stripe Tax API call or estimated fallback.
 */
const calculateOrderTax = async (shippingAddress, itemsSnapshot, currency) => {
  try {
    // Convert country to ISO 2-letter format if needed (Stripe Tax requirement)
    let countryCode = shippingAddress.country;
    if (countryCode && countryCode.toLowerCase() === 'india') countryCode = 'IN';
    else if (countryCode && countryCode.length > 2) countryCode = 'US';

    const lineItems = itemsSnapshot.map((item, idx) => ({
      amount: item.totalPrice, // in paise
      reference: `item_${idx}`,
      tax_behavior: 'exclusive'
    }));

    const taxCalc = await stripeUtils.calculateTax({
      currency: currency.toLowerCase(),
      line_items: lineItems,
      customer_details: {
        address: {
          line1: shippingAddress.line1,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.postalCode,
          country: countryCode || 'IN'
        },
        address_source: 'shipping'
      }
    });

    return taxCalc.tax_amount_exclusive || 0;
  } catch (error) {
    logger.warn(`Stripe Tax calculation failed. Falling back to 5% estimate: ${error.message}`);
    const subtotal = itemsSnapshot.reduce((acc, i) => acc + i.totalPrice, 0);
    return Math.round(subtotal * 0.05); // 5% fallback tax
  }
};

/**
 * Atomic checkout flow.
 * Leverages ACID transactions for multi-document stock locking.
 */
const placeOrder = async (userId, checkoutPayload, idempotencyKey) => {
  const {
    shippingAddress,
    billingAddress,
    couponCode,
    recipient,
    requestedDeliveryDate,
    notes,
    shippingCost = 0 // default shipping cost in paise
  } = checkoutPayload;

  // Retrieve user cart from Redis
  const cart = await cartService.getCart(userId, null);
  if (!cart || cart.items.length === 0) {
    throw new APIError(400, 'Cart is empty. Cannot checkout.');
  }

  // Phase 1: Product inventory validation and snaps construction
  let subtotal = 0;
  const itemsSnapshot = [];

  for (const item of cart.items) {
    const product = await Product.findOne({ _id: item.productId, isActive: true });
    if (!product) {
      throw new APIError(404, `Product '${item.productId}' not found or inactive.`);
    }

    let unitPrice = product.basePrice;
    let variantDetails = null;

    if (item.variantSku) {
      const variant = product.variants.find((v) => v.sku === item.variantSku);
      if (!variant) {
        throw new APIError(404, `Variant SKU '${item.variantSku}' not found on product '${product.name}'.`);
      }
      if (variant.price !== undefined && variant.price !== null) {
        unitPrice = variant.price;
      }
      variantDetails = {
        sku: variant.sku,
        name: variant.name
      };
    }

    // Resolve surcharge for gift box
    let boxSurcharge = 0;
    if (item.giftBoxing && item.giftBoxing.type) {
      const boxOption = product.giftBoxing.find((b) => b.type === item.giftBoxing.type);
      boxSurcharge = boxOption ? boxOption.surcharge : item.giftBoxing.surcharge || 0;
    }

    const itemTotalPrice = (unitPrice + boxSurcharge) * item.quantity;
    subtotal += itemTotalPrice;

    itemsSnapshot.push({
      product: product._id,
      variant: variantDetails,
      quantity: item.quantity,
      unitPrice,
      totalPrice: itemTotalPrice,
      giftBoxing: {
        type: item.giftBoxing ? item.giftBoxing.type : undefined,
        surcharge: boxSurcharge
      },
      isGift: item.giftBoxing ? true : false,
      giftMessage: item.giftMessage || '',
      giftFrom: item.giftFrom || '',
      imagePublicId: item.imagePublicId || (product.images.length > 0 ? product.images[0].public_id : ''),
      categories: product.categories // needed for coupon validation
    });
  }

  // Phase 2: Coupon evaluation
  let discountAmount = 0;
  let appliedCouponId = null;

  if (couponCode) {
    const validation = await couponService.validateCoupon(couponCode, subtotal, itemsSnapshot);
    discountAmount = validation.discountAmount;
    appliedCouponId = validation.coupon._id;
  }

  // Compute subtotal post coupon
  const subtotalPostDiscount = Math.max(0, subtotal - discountAmount);

  // Phase 3: Tax calculation
  const tax = await calculateOrderTax(shippingAddress, itemsSnapshot, 'INR');

  // Compute final checkout total
  const finalTotal = subtotalPostDiscount + tax + shippingCost;

  // Phase 4: ACID Mongoose Transaction for Atomicity with WriteConflict retries
  let orderId;
  let clientSecret;
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Atomically decrement inventory for all items in the transaction session
      for (const item of itemsSnapshot) {
        if (item.variant && item.variant.sku) {
          const productUpdated = await Product.findOneAndUpdate(
            { _id: item.product, 'variants.sku': item.variant.sku },
            { $inc: { 'variants.$[elem].inventory': -item.quantity } },
            {
              arrayFilters: [{ 'elem.sku': item.variant.sku, 'elem.inventory': { $gte: item.quantity } }],
              session,
              new: true
            }
          );

          if (!productUpdated) {
            throw new APIError(400, `Item out of stock: Insufficient inventory for product variant sku ${item.variant.sku}.`);
          }
        } else {
          const productUpdated = await Product.findOneAndUpdate(
            { _id: item.product, inventory: { $gte: item.quantity } },
            { $inc: { inventory: -item.quantity } },
            { session, new: true }
          );

          if (!productUpdated) {
            throw new APIError(400, `Item out of stock: Insufficient inventory for product ID ${item.product}.`);
          }
        }
      }

      // Call Stripe to create PaymentIntent
      const paymentIntent = await stripeUtils.createPaymentIntent({
        amount: finalTotal,
        currency: 'inr',
        metadata: {
          userId: userId.toString(),
          idempotencyKey
        }
      });

      clientSecret = paymentIntent.client_secret;

      // Create Order in DB
      const order = new Order({
        user: userId,
        items: itemsSnapshot,
        subtotal: subtotalPostDiscount,
        shippingCost,
        tax,
        total: finalTotal,
        currency: 'INR',
        status: 'pending',
        shippingAddress,
        billingAddress,
        recipient,
        requestedDeliveryDate,
        paymentIntentId: paymentIntent.id,
        idempotencyKey,
        couponCode,
        discount: discountAmount,
        notes
      });

      await order.save({ session });
      orderId = order._id;

      // Commit changes
      await session.commitTransaction();
      session.endSession();

      // Clear user cart in Redis post checkout
      await cartService.clearCart(userId, null);
      break; // success, escape retry loop
    } catch (error) {
      // Rollback changes on any inventory lock or stripe error
      await session.abortTransaction();
      session.endSession();

      const isWriteConflict = error.code === 112 || (error.message && error.message.includes('WriteConflict'));
      if (isWriteConflict && attempts < maxAttempts - 1) {
        attempts++;
        logger.warn(`WriteConflict detected in checkout transaction. Retrying attempt ${attempts + 1}/${maxAttempts}...`);
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 50 + 10)); // tiny backoff delay
        continue;
      }
      throw error;
    }
  }

  // Phase 5: Schedule BullMQ inventory release (15 min delay)
  await inventoryQueue.add(
    'inventory-release-job',
    { orderId },
    { delay: 15 * 60 * 1000, jobId: orderId.toString() } // 15 mins
  );

  return { orderId, clientSecret };
};

const getOrdersByUser = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments({ user: userId });
  return { orders, total, page, pages: Math.ceil(total / limit) };
};

const getOrderById = async (orderId, userId, role) => {
  const order = await Order.findById(orderId).populate('user', 'name email');
  if (!order) {
    throw new APIError(404, 'Order not found.');
  }

  // Only allow owner or admin roles to view order details
  if (role !== 'admin' && order.user._id.toString() !== userId.toString()) {
    throw new APIError(403, 'Unauthorized. Access denied to this order.');
  }

  return order;
};

const releaseInventoryForOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order || order.status !== 'pending') return;

  for (const item of order.items) {
    try {
      if (item.variant && item.variant.sku) {
        await Product.findOneAndUpdate(
          { _id: item.product, 'variants.sku': item.variant.sku },
          { $inc: { 'variants.$[elem].inventory': item.quantity } },
          { arrayFilters: [{ 'elem.sku': item.variant.sku }], new: true }
        );
      } else {
        await Product.findOneAndUpdate(
          { _id: item.product },
          { $inc: { inventory: item.quantity } },
          { new: true }
        );
      }
    } catch (err) {
      logger.error(`Failed to restore inventory for product ${item.product}: ${err.message}`);
    }
  }

  order.status = 'cancelled';
  await order.save();
  logger.info(`Released inventory and cancelled order ${orderId}`);
};

module.exports = {
  placeOrder,
  getOrdersByUser,
  getOrderById,
  releaseInventoryForOrder
};

