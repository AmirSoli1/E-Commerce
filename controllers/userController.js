//export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
const { StatusCodes } = require('http-status-codes');
const User = require('../Models/User');
const { NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select('-password');
  if (!user) {
    throw new NotFoundError('User does not exist');
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).send('showCurrentUser');
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).send('updateUser');
};

const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).send('updateUserPassword');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
