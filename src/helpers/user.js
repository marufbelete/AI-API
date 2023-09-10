const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isEmailExist = async (email) => {
  const user = await User.findOne({
    where: { email: email }
  });
  return user;
};

const isPasswordCorrect = async (incomingPassword, existingPassword) => {
  const isMatch = await bcrypt.compare(incomingPassword, existingPassword);
  return isMatch;
};

const issueToken = async function (param, key,expirey={}) {
  const token = jwt.sign(param, key, { ...expirey });
  return token;
};

const isTokenValid = async function (token,secret) {
  const user = jwt.verify(token,secret);
  return user;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};




module.exports = {
  isEmailExist,
  isPasswordCorrect,
  issueToken,
  hashPassword,
  isTokenValid
};
