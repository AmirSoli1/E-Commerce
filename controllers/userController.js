//export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).send('getAllUsers');
};

const getSingleUser = async (req, res) => {
  res.status(StatusCodes.OK).send('getSingleUser');
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
