
"use strict";
const httpStatus = require("http-status");
const loginUser = require("../sql/loginUser_sql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config({});

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "55m",
    }
  );
  const refreshToken = jwt.sign(
    { userId }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

module.exports = async (call,callback) => {
  try {
    let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Register Failed",
      };
    const dbResponse = await loginUser(call.request.email, call.request.password);
    if (dbResponse.status === true) {
        response.status = httpStatus.OK;
        response.message = dbResponse.message;
      }

    const user = dbResponse.result;
    const { accessToken, refreshToken } = generateTokens(user);
    return callback(null, {
       response:{ status: httpStatus.OK,
        message: "Login Successful"},
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
