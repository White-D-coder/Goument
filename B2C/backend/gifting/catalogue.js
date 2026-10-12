'use strict';
const items = require('./catalogue-items');
const prices = require('./prices.json');
const { transaction, audit } = require('../database/transactions/common');
const { applyStock } = require('../database/transactions/inventory');
const { failure } = require('../payments/razorpay');
const canonicalId = id => id === 'india_hamper' ? 'india_hamper_burgundy' : id;
const skuFor = id => `GIFT-${canonicalId(id).replaceAll('_', '-').toUpperCase()}`;
const categories = { 'Gift Hampers': 'hampers', 'Shagun Envelopes': 'envelopes', 'Laddoo Candles': 'candles', Candles: 'candles', Bookmarks: 'bookmarks', 'Executive Sets': 'executive-sets' };

// Explicit operator action only. Never run from a request/cold start. Existing
// records or consumed stock are not silently repriced or reset to 100.
async function provisionCatalogue(db, openingStock) {
  if (openingStock !== 100) throw failure('This catalogue setup approves exactly 100 opening units per product/pack.');
  return transaction(db, async session => {
    let created = 0;
    for (const item of items.filter(row => canonicalId(row.id) === row.id)) {
      const sku = skuFor(item.id);
      const existing = await db.models.ProductVariant.findOne({ sku }).session(session);
      if (existing) {
        if (existing.attributes.get('giftItemId') !== item.id || existing.currency !== 'INR') throw failure('Existing catalogue mapping needs operator review.', 409);
        continue;
      }
      // Reusing an unrelated slug could allocate a second stock pool to one gift.
      let product = await db.models.Product.findOne({ slug: item.slug }).session(session);
      if (product && (!item.packSize || !await db.models.ProductVariant.exists({ productId: product._id, sku: skuFor(item.id.replace(/-pack-10$/, '')) }).session(session))) throw failure('Existing product needs an explicit stock mapping; no changes applied.', 409);
      const slug = categories[item.category];
      let category = await db.models.Category.findOne({ slug }).session(session);
      if (!category) [category] = await db.models.Category.create([{ name: item.category, slug }], { session });
      if (!product) [product] = await db.models.Product.create([{ name: item.name, slug: item.slug, shortDescription: item.description, categoryIds: [category._id], status: 'ACTIVE', media: [{ url: item.image, alt: item.name }] }], { session });
      const [variant] = await db.models.ProductVariant.create([{ productId: product._id, sku, name: item.packSize ? `Pack of ${item.packSize}` : 'Standard', priceMinor: item.packSize === 10 ? 149900 : prices[item.slug], currency: 'INR', attributes: { giftItemId: item.id, priceIncludesTax: 'true', taxRateBps: '1800', ...(item.packSize ? { packSize: String(item.packSize) } : {}) } }], { session });
      await db.models.Inventory.create([{ variantId: variant._id, sku }], { session });
      await applyStock(db, session, { variantId: variant._id, type: 'RESTOCK', quantity: openingStock, operationKey: `gift-catalogue-v1:${sku}`, reason: 'User-approved initial stock: 100 product/pack units' });
      await audit(db, session, 'GIFT_CATALOGUE_PROVISIONED', 'products', product, undefined, undefined, { sku, inclusivePriceMinor: variant.priceMinor, openingStock });
      created++;
    }
    return { created, stockUnit: 'product/pack', openingStock };
  });
}

// Bounded batch reads, never one database request per displayed card.
async function saleableRows(db, rows, session) {
  const variants = await db.models.ProductVariant.find({ sku: { $in: rows.map(row => skuFor(row.id)) }, status: 'ACTIVE' }).session(session || null);
  const products = await db.models.Product.find({ _id: { $in: variants.map(v => v.productId) }, status: 'ACTIVE' }).session(session || null);
  const stock = await db.models.Inventory.find({ variantId: { $in: variants.map(v => v._id) }, status: { $ne: 'DISABLED' } }).session(session || null);
  return rows.map(row => {
    const variant = variants.find(v => v.sku === skuFor(row.id) && v.attributes.get('giftItemId') === canonicalId(row.id));
    const product = variant && products.find(p => String(p._id) === String(variant.productId));
    const inventory = variant && stock.find(s => String(s.variantId) === String(variant._id));
    if (!variant || !product || !inventory || variant.currency !== 'INR' || !Number.isSafeInteger(variant.priceMinor) || variant.priceMinor < 100 || variant.attributes.get('priceIncludesTax') !== 'true' || variant.attributes.get('taxRateBps') !== '1800') throw failure('A selected gift is not available for checkout yet.', 409);
    return { row, variant, product, inventory };
  });
}
module.exports = { provisionCatalogue, saleableRows, skuFor, canonicalId };
