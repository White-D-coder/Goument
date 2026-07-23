const mongoose = require('mongoose');

const orderAddressSchema = new mongoose.Schema({
  label: String,
  fullName: { type: String, required: true },
  line1: { type: String, required: true },
  line2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true }
}, { _id: false });

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: {
    sku: String,
    name: String
  },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  giftBoxing: {
    type: { type: String, enum: ['classics', 'royale-tin', 'premium-velvet'] },
    surcharge: { type: Number, default: 0 }
  },
  isGift: { type: Boolean, default: false },
  giftMessage: { type: String, maxlength: 500 },
  giftFrom: String,
  imagePublicId: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'expired'],
    default: 'pending',
    index: true
  },
  shippingAddress: orderAddressSchema,
  billingAddress: orderAddressSchema,
  recipient: {
    name: String,
    phone: String,
    email: String
  },
  requestedDeliveryDate: Date,
  paymentIntentId: { type: String, index: true },
  idempotencyKey: { type: String, unique: true, index: true },
  couponCode: { type: String, uppercase: true, trim: true },
  discount: { type: Number, default: 0 },
  trackingNumber: String,
  notes: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
