const Review = require('./review.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const createReview = async (userId, reviewData) => {
  try {
    const review = new Review({
      user: userId,
      product: reviewData.productId,
      rating: reviewData.rating,
      title: reviewData.title,
      body: reviewData.body
    });
    await review.save();
    return review;
  } catch (error) {
    // Catch duplicate user + product compound index violations
    if (error.code === 11000) {
      throw new APIError(400, 'You have already reviewed this product.');
    }
    throw error;
  }
};

const getReviewsByProduct = async (productId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const reviews = await Review.find({ product: productId, isApproved: true })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments({ product: productId, isApproved: true });
  return {
    reviews,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

const approveReview = async (reviewId) => {
  const review = await Review.findByIdAndUpdate(
    reviewId,
    { isApproved: true },
    { new: true }
  );
  if (!review) {
    throw new APIError(404, 'Review not found.');
  }
  return review;
};

module.exports = {
  createReview,
  getReviewsByProduct,
  approveReview
};
