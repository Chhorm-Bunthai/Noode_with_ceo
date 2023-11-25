/* eslint-disable new-cap */
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');
// eslint-disable-next-line import/no-unresolved, node/no-missing-require, import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: 'string',
    required: [true, 'Please tell us your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  Photo: String,
  password: {
    type: 'string',
    required: [true, 'Please provide a password'],
    maxlength: 8,
  },
  passwordConfirm: {
    type: 'string',
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (el) {
        // this only works on create and save
        return el === this.password;
      },
      message: 'The password is not the same!',
    },
  },
  passwordChangeAt: Date,
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete Password confirmation field
  this.passwordConfirm = undefined;
});
// This is for checking login Users
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changeTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10,
    );
    console.log(changeTimestamp, JWTTimestamp);
    return JWTTimestamp < changeTimestamp;
  }
  //  false mean Not change
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
