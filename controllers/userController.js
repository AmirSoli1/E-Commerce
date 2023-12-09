//export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
const { StatusCodes } = require('http-status-codes');
const User = require('../Models/User');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors');
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} = require('../utils');

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
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError('Please fill all the fields!');
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please fill all the fields!');
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isValid = await user.comparePassword(oldPassword);
  if (!isValid) {
    throw new UnauthenticatedError('Inccorect password');
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'password updated' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
