'use strict';
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { connectDatabase, installSchema } = require('../client');
const { transaction } = require('../transactions/common');
const items = require('../../gifting/items.json');

const CATEGORIES_DEF = [
  { name: 'Gift Hampers', slug: 'gift-hampers', sortOrder: 1 },
  { name: 'Gourmet Food', slug: 'gourmet-food', sortOrder: 2 },
  { name: 'Beverages', slug: 'beverages', sortOrder: 3 },
  { name: 'Tea & Coffee Essentials', slug: 'tea-coffee-essentials', sortOrder: 4 },
  { name: 'Tableware & Crockery', slug: 'tableware-crockery', sortOrder: 5 },
  { name: 'Eternal Paper Co.', slug: 'eternal-paper-co', sortOrder: 6 },
  { name: 'Childhood & Kids', slug: 'childhood-kids', sortOrder: 7 },
  { name: 'Home Fragrance', slug: 'home-fragrance', sortOrder: 8 },
  { name: 'Wellness & Lifestyle', slug: 'wellness-lifestyle', sortOrder: 9 },
];

async function seedCatalogue(db) {
  return transaction(db, async session => {
    // 1. Create or ensure categories
    const categoryMap = new Map();
    for (const catDef of CATEGORIES_DEF) {
      let cat = await db.models.Category.findOne({ slug: catDef.slug }).session(session);
      if (!cat) {
        const [created] = await db.models.Category.create([{
          name: catDef.name,
          slug: catDef.slug,
          description: `${catDef.name} collection by The Gourmet Gifts.`,
          sortOrder: catDef.sortOrder,
          status: 'ACTIVE',
        }], { session });
        cat = created;
      }
      categoryMap.set(catDef.name, cat._id);
    }

    let productsCreated = 0;
    for (const item of items) {
      const slug = item.id.replace(/_/g, '-');
      let product = await db.models.Product.findOne({ slug }).session(session);
      const categoryName = item.category || 'Gift Hampers';
      const catId = categoryMap.get(categoryName) || categoryMap.get('Gift Hampers');

      if (!product) {
        const [created] = await db.models.Product.create([{
          name: item.name,
          slug,
          shortDescription: item.description,
          description: item.description,
          categoryIds: [catId],
          brand: 'The Gourmet Gifts',
          status: 'ACTIVE',
          media: [{ url: item.image }],
          tags: [categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 'gift', 'gourmet'],
        }], { session });
        product = created;
        productsCreated++;

        const sku = `TGG-${item.id.toUpperCase().replace(/_/g, '-').slice(0, 20)}`;
        let variant = await db.models.ProductVariant.findOne({ sku }).session(session);
        if (!variant) {
          const [createdVariant] = await db.models.ProductVariant.create([{
            productId: product._id,
            sku,
            name: `${item.name} - Standard`,
            priceMinor: 0,
            currency: 'INR',
            status: 'ACTIVE',
            media: [{ url: item.image }],
          }], { session });
          variant = createdVariant;

          const inv = await db.models.Inventory.findOne({ sku }).session(session);
          if (!inv) {
            await db.models.Inventory.create([{
              variantId: variant._id,
              sku,
              availableQuantity: 0,
              reservedQuantity: 0,
              status: 'OUT_OF_STOCK',
            }], { session });
          }
        }
      } else {
        product.name = item.name;
        product.shortDescription = item.description;
        product.categoryIds = [catId];
        if (product.status !== 'ACTIVE' && product.status !== 'ARCHIVED') {
          product.status = 'ACTIVE';
        }
        await product.save({ session });
      }
    }

    const activeSlugs = items.map(i => i.slug || i.id);
    const inactive = await db.models.Product.find({ slug: { $nin: activeSlugs } }).session(session);
    for (const p of inactive) {
      if (p.status !== 'ARCHIVED') {
        p.status = 'ARCHIVED';
        await p.save({ session });
      }
    }

    return { totalItems: items.length, productsCreated };
  });
}

module.exports = { seedCatalogue };

if (require.main === module) {
  (async () => {
    const db = await connectDatabase();
    try {
      await installSchema(db);
      const result = await seedCatalogue(db);
      console.log('Seeded catalogue successfully:', result);
    } finally {
      await db.connection.close();
    }
  })().catch(err => {
    console.error('Catalogue seed failed:', err);
    process.exit(1);
  });
}
