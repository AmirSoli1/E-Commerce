const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxLength: [20, `name can't exceed 20 characters`],
    minLength: [2, `name must be at least 2 characters`],
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('User', userSchema);
