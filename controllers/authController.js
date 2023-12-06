const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const User = require('..//Models/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError('Email already exists');
  }
  const firstUser = (await User.countDocuments({})) === 0;
  const role = firstUser ? 'admin' : 'user';
  const user = await User.create({ name, email, password, role });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login');
};

const logout = async (req, res) => {
  console.log('gorbe');
  res.send('logout');
};

module.exports = { register, login, logout };