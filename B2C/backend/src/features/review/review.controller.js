const reviewService = require('./review.service');

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.user._id, req.body);
    return res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    return next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
    const result = await reviewService.getReviewsByProduct(req.params.productId, page, limit);
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return next(error);
  }
};

const approveReview = async (req, res, next) => {
  try {
    const review = await reviewService.approveReview(req.params.id);
    return res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createReview,
  getReviews,
  approveReview
};
