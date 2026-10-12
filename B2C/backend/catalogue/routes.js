'use strict';
const projection = '_id name slug shortDescription description media createdAt';
const publicProduct = product => ({
  _id: String(product._id), name: product.name, slug: product.slug,
  shortDescription: product.shortDescription, description: product.description,
  media: (product.media || []).map(({ url, alt }) => ({ url, alt })), createdAt: product.createdAt
});
const invalid = res => res.status(400).json({ message: 'Invalid catalogue request.' });
const unavailable = res => res.status(503).json({ message: 'Catalogue temporarily unavailable. Please try again.' });
async function pricedProducts(db, products) {
  const ids = products.map(product => product._id);
  const variants = await db.models.ProductVariant.find({ productId: { $in: ids }, status: 'ACTIVE' }).select('productId sku name priceMinor currency attributes').maxTimeMS(3000).lean();
  const stocks = await db.models.Inventory.find({ variantId: { $in: variants.map(v => v._id) }, status: { $ne: 'DISABLED' } }).select('variantId availableQuantity').maxTimeMS(3000).lean();
  return products.map(product => {
    const options = variants.filter(v => String(v.productId) === String(product._id) && v.attributes?.giftItemId && v.attributes.priceIncludesTax === 'true' && v.attributes.taxRateBps === '1800');
    const main = options.find(v => !v.attributes.giftItemId.endsWith('-pack-10'));
    if (!main) return publicProduct(product);
    const stock = stocks.find(s => String(s.variantId) === String(main._id));
    if (!stock) return publicProduct(product);
    return { ...publicProduct(product), giftItemId: main.attributes.giftItemId, basePrice: main.priceMinor, currency: main.currency, inventory: stock.availableQuantity, variants: options.map(v => ({ sku: v.sku, name: v.name, price: v.priceMinor, inventory: stocks.find(s => String(s.variantId) === String(v._id))?.availableQuantity ?? 0 })) };
  });
}
function mountCatalogue(app, db) {
  app.get('/api/v1/products', async (req, res) => {
    const { search = '', page = '1', limit = '12', sort = 'newest' } = req.query;
    if (Object.keys(req.query).some(key => !['search','page','limit','sort'].includes(key)) || typeof search !== 'string' || search.length > 80 ||
      !['newest','price_asc','price_desc'].includes(sort) || typeof page !== 'string' || !/^[1-9]\d{0,3}$/.test(page) || typeof limit !== 'string' || !/^[1-9]\d{0,2}$/.test(limit) || Number(limit) > 100) return invalid(res);
    const filter = { status: 'ACTIVE' };
    if (search.trim()) {
      const literal = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [{ name: { $regex: literal, $options: 'i' } }, { shortDescription: { $regex: literal, $options: 'i' } }];
    }
    try {
      const [products, total] = await Promise.all([
        db.models.Product.find(filter).select(projection).sort({ createdAt: -1, _id: -1 }).skip((Number(page)-1)*Number(limit)).limit(Number(limit)).maxTimeMS(3000).lean(),
        db.models.Product.countDocuments(filter).maxTimeMS(3000)
      ]);
      res.json({ products: await pricedProducts(db, products), total, pages: Math.ceil(total / Number(limit)) });
    } catch { unavailable(res); }
  });
  app.get('/api/v1/products/:slug', async (req, res) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(req.params.slug) || req.params.slug.length > 160) return invalid(res);
    try {
      const product = await db.models.Product.findOne({ slug: req.params.slug, status: 'ACTIVE' }).select(projection).maxTimeMS(3000).lean();
      if (!product) return res.status(404).json({ message: 'Gift not found.' });
      res.json({ data: (await pricedProducts(db, [product]))[0] });
    } catch { unavailable(res); }
  });
}
module.exports = { mountCatalogue };
