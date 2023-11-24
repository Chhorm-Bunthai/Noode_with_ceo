/* eslint-disable new-cap */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.schema({
  name: {
    typeof: 'string',
    required: [true, 'Please tell us your name!'],
  },
  email: {
    typeof: 'string',
    required: [true, 'Please tell us your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  Photo: String,
  password: {
    typeof: 'string',
    required: [true, 'Please provide a password'],
    maxlength: 8,
  },
  passwordConfirma: {
    typeof: 'string',
    required: [true, 'please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;