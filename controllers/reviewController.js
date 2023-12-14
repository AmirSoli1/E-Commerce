const { StatusCodes } = require('http-status-codes');
const Product = require('../Models/Product');
const Review = require('../Models/Review');

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../errors');

const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
  const { product } = req.body;
  const isProductExists = await Product.findOne({ _id: product });
  if (!isProductExists) {
    throw new NotFoundError('Product does not exist');
  }

  const isReviewExists = await Review.findOne({
    product,
    user: req.user.userId,
  });
  if (isReviewExists) {
    throw new BadRequestError(
      'User already submitted a review for this product'
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json(review);
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({
      path: 'user',
      select: 'name',
    });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id })
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({
      path: 'user',
      select: 'name',
    });
  if (!review) {
    throw new NotFoundError('review does not exist');
  }
  res.status(StatusCodes.OK).json(review);
};

const updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    throw new NotFoundError('review does not exist');
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json(review);
};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    throw new NotFoundError('review does not exist');
  }

  checkPermissions(req.user, review.user);

  await review.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'Review deleted' });
};

const getSingleProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
