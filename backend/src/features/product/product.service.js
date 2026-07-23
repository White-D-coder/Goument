const mongoose = require('mongoose');
const Product = require('./product.model');
const Category = require('../category/category.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!product) {
    throw new APIError(404, 'Product not found.');
  }
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!product) {
    throw new APIError(404, 'Product not found.');
  }
  return product;
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isActive: true }).populate('categories');
  if (!product) {
    throw new APIError(404, 'Product not found.');
  }
  return product;
};

/**
 * Paginated queries for products.
 * Uses Atlas Search aggregation if search keyword is provided.
 */
const queryProducts = async (filters = {}) => {
  const {
    search,
    category,
    giftBoxing,
    minPrice,
    maxPrice,
    tags,
    sort = 'newest',
    page = 1,
    limit = 20
  } = filters;

  const skip = (page - 1) * limit;
  const matchStage = { isActive: true };

  // Filter by category
  if (category) {
    const isObjectId = mongoose.Types.ObjectId.isValid(category);
    const categoryDoc = await Category.findOne({
      $or: [
        { slug: category },
        { _id: isObjectId ? category : null }
      ]
    });
    if (categoryDoc) {
      matchStage.categories = categoryDoc._id;
    }
  }

  // Filter by gift box type capability
  if (giftBoxing) {
    matchStage.$or = [
      { giftBoxing: { $elemMatch: { type: giftBoxing, available: true } } },
      { 'variants.giftBoxing': { $elemMatch: { type: giftBoxing, available: true } } }
    ];
  }

  // Price range filters
  if (minPrice || maxPrice) {
    matchStage.basePrice = {};
    if (minPrice) matchStage.basePrice.$gte = parseInt(minPrice, 10);
    if (maxPrice) matchStage.basePrice.$lte = parseInt(maxPrice, 10);
  }

  // Filter by tags
  if (tags) {
    const tagsArray = Array.isArray(tags) ? tags : tags.split(',');
    matchStage.tags = { $in: tagsArray };
  }

  // Sort parameter map
  let sortStage = {};
  if (sort === 'price_asc') sortStage = { basePrice: 1 };
  else if (sort === 'price_desc') sortStage = { basePrice: -1 };
  else if (sort === 'featured') sortStage = { isFeatured: -1, createdAt: -1 };
  else sortStage = { createdAt: -1 }; // newest

  // If search query is provided, attempt Atlas Search with fallback
  if (search) {
    try {
      const pipeline = [
        {
          $search: {
            index: 'product_search',
            text: {
              query: search,
              path: ['name', 'description.short', 'tags'],
              fuzzy: {}
            }
          }
        },
        { $match: matchStage }
      ];

      if (sort === 'price_asc' || sort === 'price_desc') {
        pipeline.push({ $sort: sortStage });
      } else {
        pipeline.push({ $sort: { score: { $meta: 'searchScore' } } });
      }

      pipeline.push(
        { $skip: skip },
        { $limit: parseInt(limit, 10) }
      );

      const results = await Product.aggregate(pipeline);
      const total = await Product.countDocuments(matchStage);

      return {
        products: results,
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / limit)
      };
    } catch (err) {
      // Local text search index fallback (useful for local development and Jest testing)
      const fallbackQuery = {
        ...matchStage,
        $text: { $search: search }
      };

      const scoreProjection = { score: { $meta: 'textScore' } };
      let finalSort = { score: { $meta: 'textScore' } };

      if (sort === 'price_asc' || sort === 'price_desc') {
        finalSort = sortStage;
      }

      const results = await Product.find(fallbackQuery, scoreProjection)
        .sort(finalSort)
        .skip(skip)
        .limit(parseInt(limit, 10))
        .populate('categories');

      const total = await Product.countDocuments(fallbackQuery);

      return {
        products: results,
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / limit)
      };
    }
  }

  // Normal paginated database filter query
  const products = await Product.find(matchStage)
    .sort(sortStage)
    .skip(skip)
    .limit(parseInt(limit, 10))
    .populate('categories');

  const total = await Product.countDocuments(matchStage);

  return {
    products,
    total,
    page: parseInt(page, 10),
    pages: Math.ceil(total / limit)
  };
};

/**
 * Atlas Search Autocomplete suggestions fallback to local regex query.
 */
const getSuggestions = async (query) => {
  if (!query) return [];

  try {
    const pipeline = [
      {
        $search: {
          index: 'product_autocomplete',
          autocomplete: {
            query: query,
            path: 'name',
            tokenization: 'edgeGram'
          }
        }
      },
      { $limit: 5 },
      { $project: { name: 1, slug: 1 } }
    ];
    return await Product.aggregate(pipeline);
  } catch (err) {
    return Product.find({
      name: { $regex: query, $options: 'i' },
      isActive: true
    })
      .limit(5)
      .select('name slug')
      .lean();
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  queryProducts,
  getSuggestions
};
