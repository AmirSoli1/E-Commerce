const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');
const User = require('..//Models/User');
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError('Email already exists');
  }
  const firstUser = (await User.countDocuments({})) === 0;
  const role = firstUser ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name, userId: user._id, role };
  attachCookiesToResponse({ res, tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please fill all the fields!');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Inccorect email or password');
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new UnauthenticatedError('Inccorect email or password');
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('token', 'blah', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'logged out' });
};

module.exports = { register, login, logout };
