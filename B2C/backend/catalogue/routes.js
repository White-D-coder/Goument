'use strict';
const projection = '_id name slug shortDescription description media createdAt';
const publicProduct = product => ({
  _id: String(product._id), name: product.name, slug: product.slug,
  shortDescription: product.shortDescription, description: product.description,
  media: (product.media || []).map(({ url, alt }) => ({ url, alt })), createdAt: product.createdAt
});
const invalid = res => res.status(400).json({ message: 'Invalid catalogue request.' });
const unavailable = res => res.status(503).json({ message: 'Catalogue temporarily unavailable. Please try again.' });
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
      res.json({ products: products.map(publicProduct), total, pages: Math.ceil(total / Number(limit)) });
    } catch { unavailable(res); }
  });
  app.get('/api/v1/products/:slug', async (req, res) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(req.params.slug) || req.params.slug.length > 160) return invalid(res);
    try {
      const product = await db.models.Product.findOne({ slug: req.params.slug, status: 'ACTIVE' }).select(projection).maxTimeMS(3000).lean();
      if (!product) return res.status(404).json({ message: 'Gift not found.' });
      res.json({ data: publicProduct(product) });
    } catch { unavailable(res); }
  });
}
module.exports = { mountCatalogue };
