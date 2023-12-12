const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
  res.status(StatusCodes.CREATED).send('createProduct');
};

const getAllProducts = async (req, res) => {
  res.status(StatusCodes.OK).send('getAllProducts');
};

const getSingleProsuct = async (req, res) => {
  res.status(StatusCodes.OK).send('getSingleProsuct');
};

const updateProduct = async (req, res) => {
  res.status(StatusCodes.OK).send('updateProduct');
};

const deleteProduct = async (req, res) => {
  res.status(StatusCodes.OK).send('deleteProduct');
};

const uploadImage = async (req, res) => {
  res.status(StatusCodes.OK).send('uploadImage');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProsuct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
