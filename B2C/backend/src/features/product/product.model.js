const mongoose = require('mongoose');
const slugify = require('slugify');

const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  alt: { type: String, default: '' },
  context: { type: String, enum: ['main', 'angle', 'lifestyle', 'packaging', 'detail'], default: 'main' },
  width: Number,
  height: Number,
  placeholder: String // base64 blur hash
}, { _id: false });

const giftBoxingSchema = new mongoose.Schema({
  type: { type: String, enum: ['classics', 'royale-tin', 'premium-velvet'], required: true },
  available: { type: Boolean, default: true },
  surcharge: { type: Number, default: 0 },
  boxSpecificImages: [imageSchema]
}, { _id: false });

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true, sparse: true },
  price: Number, // overrides basePrice if set
  inventory: { type: Number, default: 0, min: 0 },
  images: [imageSchema],
  giftBoxing: [giftBoxingSchema]
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true, index: true },
  description: {
    short: String,
    long: String,
    ingredients: String,
    howToUse: String
  },
  basePrice: { type: Number, required: true }, // in paise
  compareAtPrice: Number,
  costPrice: Number,
  currency: { type: String, default: 'INR' },
  sku: { type: String, unique: true, sparse: true },
  inventory: { type: Number, default: 0, min: 0 }, // fallback when no variants
  isActive: { type: Boolean, default: true, index: true },
  isFeatured: { type: Boolean, default: false },
  giftBoxing: [giftBoxingSchema],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
  variants: [variantSchema],
  images: [imageSchema],
  tags: [String],
  origin: String,
  nutritionalInfo: { type: Map, of: String },
  searchScore: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.index({ 'giftBoxing.type': 1, 'giftBoxing.available': 1 });
productSchema.index({ 'variants.giftBoxing.type': 1 });
productSchema.index({ categories: 1, isActive: 1 });
productSchema.index({ name: 'text', 'description.short': 'text', tags: 'text' }); // fallback text index

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
