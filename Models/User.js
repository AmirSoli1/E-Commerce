const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxLength: [50, `name can't exceed 20 characters`],
    minLength: [3, `name must be at least 2 characters`],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, `password must have at least 6 characters`],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
