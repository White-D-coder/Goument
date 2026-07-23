const Category = require('./category.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const createCategory = async (categoryData) => {
  if (categoryData.slug) {
    const exists = await Category.findOne({ slug: categoryData.slug });
    if (exists) {
      throw new APIError(400, `Category slug '${categoryData.slug}' is already taken.`);
    }
  }

  const category = new Category(categoryData);
  await category.save();
  return category;
};

const getCategoryTree = async (filterType = null) => {
  const query = { isActive: true };
  if (filterType) {
    query.type = filterType;
  }

  const list = await Category.find(query).sort({ order: 1, name: 1 });
  const map = {};

  list.forEach((item) => {
    map[item._id.toString()] = {
      ...item.toObject(),
      children: []
    };
  });

  const roots = [];
  list.forEach((item) => {
    const itemObj = map[item._id.toString()];
    if (item.parent) {
      const parentIdStr = item.parent.toString();
      if (map[parentIdStr]) {
        map[parentIdStr].children.push(itemObj);
      } else {
        roots.push(itemObj);
      }
    } else {
      roots.push(itemObj);
    }
  });

  return roots;
};

const getCategoryBySlug = async (slug) => {
  const category = await Category.findOne({ slug, isActive: true });
  if (!category) {
    throw new APIError(404, 'Category not found.');
  }
  return category;
};

const updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!category) {
    throw new APIError(404, 'Category not found.');
  }
  return category;
};

module.exports = {
  createCategory,
  getCategoryTree,
  getCategoryBySlug,
  updateCategory
};
