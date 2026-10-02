'use strict';

const { applyStock } = require('../database/transactions/inventory');
const { graphs } = require('../database/models/states');

// These handlers run inside executeCommand's authorization/idempotency transaction.
// They never accept a role, actor, stock balance, payment state or audit payload.
const fail = (message, status = 422) => { throw Object.assign(new Error(message), { status }); };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function fields(value, allowed) {
  if (!object(value) || Object.keys(value).some(key => !allowed.includes(key))) fail('Unexpected or invalid fields.');
  return value;
}
function text(value, name, max = 250) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) fail(`Invalid ${name}.`);
  return value.trim();
}
function integer(value, name, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (!Number.isSafeInteger(value) || value < min || value > max) fail(`Invalid ${name}.`);
  return value;
}
function id(value, name = 'reference') {
  if (typeof value !== 'string' || !/^[a-f0-9]{24}$/i.test(value)) fail(`Invalid ${name}.`);
  return value.toLowerCase();
}
function choice(value, name, options) {
  if (!options.includes(value)) fail(`Invalid ${name}.`);
  return value;
}
function slug(value) {
  const result = text(value, 'slug');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result)) fail('Use a lowercase URL slug.');
  return result;
}
function currency(value) {
  if (typeof value !== 'string' || !/^[A-Z]{3}$/.test(value)) fail('Currency must be a three-letter uppercase code.');
  return value;
}
function url(value, local = false) {
  const result = text(value, 'URL', 2048);
  if (local && /^\/(?!\/)/.test(result) && !/[\\\s]/.test(result)) return result;
  let parsed; try { parsed = new URL(result); } catch { fail('Invalid URL.'); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) fail('An HTTPS URL without credentials is required.');
  return result;
}
function array(value, name, max, parse, min = 0) {
  if (!Array.isArray(value) || value.length < min || value.length > max) fail(`Invalid ${name}.`);
  return value.map(parse);
}
function seo(value) {
  fields(value, ['title', 'description', 'keywords', 'canonicalUrl']);
  return optional(value, {
    title: v => text(v, 'SEO title', 160), description: v => text(v, 'SEO description', 320),
    keywords: v => array(v, 'SEO keywords', 30, x => text(x, 'keyword')), canonicalUrl: v => url(v),
  });
}
function media(value) {
  return array(value, 'media', 20, entry => {
    fields(entry, ['url', 'alt', 'publicId', 'type', 'sortOrder']);
    if (!Object.hasOwn(entry, 'url')) fail('Media URL is required.');
    return optional(entry, {
      url: v => url(v, true), alt: v => text(v, 'image description'), publicId: v => text(v, 'media reference'),
      type: v => choice(v, 'media type', ['IMAGE', 'VIDEO']), sortOrder: v => integer(v, 'media order'),
    });
  });
}
function optional(input, validators) {
  return Object.fromEntries(Object.entries(validators).filter(([key]) => Object.hasOwn(input, key)).map(([key, parse]) => [key, parse(input[key])]));
}
function required(input, names) {
  for (const name of names) if (!Object.hasOwn(input, name)) fail(`${name} is required.`);
}
function referenceList(value) {
  const result = array(value, 'categories', 20, entry => id(entry, 'category'), 1);
  if (new Set(result).size !== result.length) fail('Duplicate categories are not allowed.');
  return result;
}
async function record(db, session, model, input) {
  const resourceId = id(input.id);
  const expected = integer(input.expectedVersion, 'expected version');
  const row = await db.models[model].findById(resourceId).session(session);
  if (!row) fail('Resource not found.', 404);
  if ((model === 'Inventory' ? row.version : row.__v) !== expected) fail('This resource changed. Reload before trying again.', 409);
  return row;
}
const result = (resource, row) => ({ resource, id: String(row._id), version: resource === 'inventory' ? row.version : row.__v });
function transition(graph, row, next) {
  if (next !== undefined && next !== row.status && !graphs[graph][row.status]?.includes(next)) fail('This status change is not allowed.', 409);
}
async function categoriesExist(db, session, categoryIds) {
  if (categoryIds && await db.models.Category.countDocuments({ _id: { $in: categoryIds } }).session(session) !== categoryIds.length) fail('Category not found.', 404);
}

const categoryFields = {
  name: v => text(v, 'category name'), slug, description: v => text(v, 'description', 4000),
  parentId: v => id(v, 'parent category'), imageUrl: v => url(v),
  status: v => choice(v, 'category status', ['ACTIVE', 'INACTIVE']), sortOrder: v => integer(v, 'category order'), seo,
};
async function createCategory(db, session, actor, input) {
  void actor;
  fields(input, Object.keys(categoryFields)); required(input, ['name', 'slug']);
  const values = optional(input, categoryFields);
  if (values.parentId && !await db.models.Category.exists({ _id: values.parentId }).session(session)) fail('Parent category not found.', 404);
  const row = new db.models.Category(values);
  await row.save({ session }); return result('categories', row);
}

const productFields = {
  name: v => text(v, 'product name'), slug, shortDescription: v => text(v, 'short description', 500),
  description: v => text(v, 'description', 10000), categoryIds: referenceList, brand: v => text(v, 'brand'),
  status: v => choice(v, 'product status', ['DRAFT', 'ACTIVE', 'ARCHIVED']), media, seo,
  tags: v => array(v, 'tags', 30, entry => text(entry, 'tag', 50)),
};
async function createProduct(db, session, actor, input) {
  void actor;
  fields(input, Object.keys(productFields)); required(input, ['name', 'slug', 'categoryIds']);
  const values = optional(input, productFields);
  if (values.status === 'ARCHIVED') fail('A new product cannot start archived.');
  await categoriesExist(db, session, values.categoryIds);
  const row = new db.models.Product(values);
  await row.save({ session }); return result('products', row);
}
async function updateProduct(db, session, actor, input) {
  void actor;
  fields(input, ['id', 'expectedVersion', ...Object.keys(productFields)]);
  const values = optional(input, productFields);
  if (!Object.keys(values).length) fail('Choose a product field to update.');
  const row = await record(db, session, 'Product', input);
  transition('ProductStatus', row, values.status);
  await categoriesExist(db, session, values.categoryIds);
  row.set(values); await row.save({ session }); return result('products', row);
}

function attributes(value) {
  if (!object(value) || Object.keys(value).length > 20) fail('Invalid variant attributes.');
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (!key.trim() || key.length > 50 || /[.$]/.test(key) || ['__proto__', 'constructor', 'prototype'].includes(key)) fail('Invalid attribute name.');
    result[key] = text(item, 'attribute value', 100);
  }
  return result;
}
function dimensions(value) {
  fields(value, ['lengthCm', 'widthCm', 'heightCm']);
  return optional(value, Object.fromEntries(['lengthCm', 'widthCm', 'heightCm'].map(key => [key, v => {
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 100000) fail('Invalid dimensions.');
    return v;
  }])));
}
const variantFields = {
  name: v => text(v, 'variant name'), attributes, priceMinor: v => integer(v, 'price'),
  compareAtPriceMinor: v => integer(v, 'compare-at price'), currency,
  status: v => choice(v, 'variant status', ['ACTIVE', 'INACTIVE']),
  weightGrams: v => integer(v, 'weight'), dimensions, media,
};
async function createVariant(db, session, actor, input) {
  void actor;
  fields(input, ['productId', 'sku', ...Object.keys(variantFields)]);
  required(input, ['productId', 'sku', 'priceMinor', 'currency']);
  const productId = id(input.productId, 'product');
  const product = await db.models.Product.findById(productId).session(session);
  if (!product) fail('Product not found.', 404);
  if (product.status === 'ARCHIVED') fail('Archived products cannot receive variants.', 409);
  const row = new db.models.ProductVariant({ ...optional(input, variantFields), productId, sku: text(input.sku, 'SKU').toUpperCase() });
  await row.save({ session });
  await db.models.Inventory.create([{ variantId: row._id, sku: row.sku }], { session });
  return result('variants', row);
}
async function updateVariant(db, session, actor, input) {
  void actor;
  fields(input, ['id', 'expectedVersion', ...Object.keys(variantFields)]);
  const values = optional(input, variantFields);
  if (!Object.keys(values).length) fail('Choose a variant field to update.');
  const row = await record(db, session, 'ProductVariant', input);
  transition('VariantStatus', row, values.status);
  row.set(values); await row.save({ session }); return result('variants', row);
}
async function adjustInventory(db, session, actor, input) {
  fields(input, ['id', 'expectedVersion', 'quantity', 'reason']);
  const quantity = integer(input.quantity, 'adjustment quantity', -Number.MAX_SAFE_INTEGER);
  if (!quantity) fail('Adjustment quantity must not be zero.');
  const reason = text(input.reason, 'adjustment reason', 500);
  const row = await record(db, session, 'Inventory', input);
  if (row.status === 'DISABLED') fail('Inventory is disabled.', 409);
  if (row.availableQuantity + quantity < 0) fail('Insufficient available stock for this adjustment.', 409);
  if (!Number.isSafeInteger(row.availableQuantity + quantity)) fail('Adjustment exceeds the supported stock balance.', 409);
  await applyStock(db, session, {
    variantId: row.variantId, type: 'ADJUSTMENT', quantity, actorId: id(actor.id, 'actor'), reason,
    operationKey: `admin-stock:${row._id}:${input.expectedVersion}`,
  });
  const saved = await db.models.Inventory.findById(row._id).session(session);
  return result('inventory', saved);
}

function date(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) fail('Use a UTC ISO date.');
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString() !== (value.includes('.') ? value : value.replace('Z', '.000Z'))) fail('Invalid date.');
  return parsed;
}
const couponFields = {
  code: v => text(v, 'coupon code').toUpperCase(), discountType: v => choice(v, 'discount type', ['PERCENTAGE', 'FIXED_AMOUNT']),
  percentageBps: v => integer(v, 'percentage basis points', 1, 10000), fixedAmountMinor: v => integer(v, 'fixed discount', 1),
  currency, minimumOrderMinor: v => integer(v, 'minimum order'), maximumDiscountMinor: v => integer(v, 'maximum discount'),
  usageLimit: v => integer(v, 'usage limit', 1), perCustomerLimit: v => integer(v, 'per-customer limit', 1),
  startsAt: date, expiresAt: date, status: v => choice(v, 'coupon status', ['ACTIVE', 'INACTIVE', 'EXPIRED']),
};
function applyCoupon(row, values) {
  if (values.discountType && values.discountType !== row.discountType) {
    if (values.discountType === 'PERCENTAGE') row.fixedAmountMinor = undefined;
    else row.percentageBps = undefined;
  }
  row.set(values);
}
function couponValid(row) {
  if (row.discountType === 'PERCENTAGE'
    ? !row.percentageBps || row.fixedAmountMinor !== undefined
    : !row.fixedAmountMinor || !row.currency || row.percentageBps !== undefined) fail('Supply the correct amount or percentage for this coupon.');
  if (row.startsAt && row.expiresAt && row.startsAt >= row.expiresAt) fail('Coupon expiry must be after its start date.');
  if (row.usageLimit !== undefined && row.totalUsed > row.usageLimit) fail('The usage limit cannot be below recorded coupon usage.', 409);
}
async function createCoupon(db, session, actor, input) {
  void actor;
  fields(input, Object.keys(couponFields)); required(input, ['code', 'discountType']);
  const row = new db.models.Coupon(optional(input, couponFields));
  couponValid(row);
  await row.save({ session }); return result('coupons', row);
}
async function updateCoupon(db, session, actor, input) {
  void actor;
  fields(input, ['id', 'expectedVersion', ...Object.keys(couponFields)]);
  const values = optional(input, couponFields);
  if (!Object.keys(values).length) fail('Choose a coupon field to update.');
  const row = await record(db, session, 'Coupon', input);
  transition('CouponStatus', row, values.status);
  applyCoupon(row, values); couponValid(row); await row.save({ session }); return result('coupons', row);
}
async function beginOrderProcessing(db, session, actor, input) {
  void actor;
  fields(input, ['id', 'expectedVersion']);
  const row = await record(db, session, 'Order', input);
  if (row.status !== 'CONFIRMED' || row.paymentStatus !== 'PAID' || row.fulfillmentStatus !== 'UNFULFILLED') fail('Only a paid, confirmed, unfulfilled order can begin processing.', 409);
  row.status = 'PROCESSING'; row.fulfillmentStatus = 'PROCESSING';
  await row.save({ session }); return result('orders', row);
}

module.exports = { createCategory, createProduct, updateProduct, createVariant, updateVariant, adjustInventory, createCoupon, updateCoupon, beginOrderProcessing };
