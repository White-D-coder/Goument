const categoryService = require('./category.service');
const productService = require('../product/product.service');

const getCategoryTree = async (req, res, next) => {
  try {
    const filterType = req.query.type; // supports filtering by gift_box_section or product_category
    const tree = await categoryService.getCategoryTree(filterType);
    return res.status(200).json({
      success: true,
      data: tree
    });
  } catch (error) {
    return next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug);

    // Retrieve paginated products associated with this category
    const filters = {
      category: category.slug,
      giftBoxing: req.query.giftBoxing,
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 20
    };

    const productsResult = await productService.queryProducts(filters);

    return res.status(200).json({
      success: true,
      data: {
        category,
        products: productsResult.products,
        total: productsResult.total,
        page: productsResult.page,
        pages: productsResult.pages
      }
    });
  } catch (error) {
    return next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCategoryTree,
  getCategoryBySlug,
  createCategory,
  updateCategory
};
