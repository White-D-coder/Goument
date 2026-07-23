const productService = require('./product.service');

const getProducts = async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      giftBoxing: req.query.giftBoxing,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      tags: req.query.tags,
      sort: req.query.sort,
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 20
    };

    const result = await productService.queryProducts(filters);
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    return next(error);
  }
};

const getSuggestions = async (req, res, next) => {
  try {
    const suggestions = await productService.getSuggestions(req.query.q);
    return res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully (soft delete).'
    });
  } catch (error) {
    return next(error);
  }
};

const updateProductImages = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, {
      images: req.body.images
    });
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  getSuggestions,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductImages
};
