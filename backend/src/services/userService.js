const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createUser = async ({ name, email, password, phone, role }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.statusCode = 400;
    throw err;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, phone, role });
  return user;
};

exports.findByEmail = async (email) => {
  return await User.findOne({ email });
};
