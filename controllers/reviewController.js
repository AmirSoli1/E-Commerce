const { StatusCodes } = require('http-status-codes');

const createReview = async (req, res) => {
  res.status(StatusCodes.CREATED).send('createReview');
};

const getAllReviews = async (req, res) => {
  res.status(StatusCodes.OK).send('getAllReviews');
};

const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).send('getSingleReview');
};

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).send('updateReview');
};

const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).send('deleteReview');
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
