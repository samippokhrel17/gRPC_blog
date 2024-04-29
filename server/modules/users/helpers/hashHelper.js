"use strict";

const bcrypt = require("bcrypt");

const hashHelper = {};

const saltRounds = 5;

hashHelper.generateSalt = async () => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
};

hashHelper.hashPassword = async (password, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

module.exports = hashHelper;
