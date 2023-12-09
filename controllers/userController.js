//export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
const { StatusCodes } = require('http-status-codes');
const User = require('../Models/User');
const { NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  const usersQuery = User.find({ role: 'user' });
  usersQuery.select('-password');
  const users = await usersQuery;
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const userQuery = User.findOne({ _id: id });
  if (!userQuery) {
    throw new NotFoundError('User does not exist');
  }
  userQuery.select('-password');
  const user = await userQuery;
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
