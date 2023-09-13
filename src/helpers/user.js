const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {hash,verify}=require('argon2')
const isEmailExist = async (email) => {
  const user = await User.findOne({
    where: { email: email }
  });
  return user;
};

const isPasswordCorrect = async (incomingPassword, existingPassword) => {
  return verify(existingPassword,incomingPassword)
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
  return await hash(password)
};




module.exports = {
  isEmailExist,
  isPasswordCorrect,
  issueToken,
  hashPassword,
  isTokenValid
};
