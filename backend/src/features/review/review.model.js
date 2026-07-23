const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    maxlength: 200
  },
  body: {
    type: String,
    maxlength: 2000
  },
  isApproved: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

reviewSchema.index({ product: 1, isApproved: 1, createdAt: -1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
