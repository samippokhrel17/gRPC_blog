"use strict";

const httpStatus = require("http-status");
const hashHelper = require("./../helpers/hashHelper");
const { dbHelper } = require("../../../helper");
const bcrypt = require("bcrypt");
module.exports = async (email,password) => {
  try {
    let response = {
      status: httpStatus.BAD_REQUEST,
      message: "Register Failed",
    };


    let query = `SELECT * FROM  blog.user WHERE email = ?`;
    const [result] = await dbHelper.executeQuery(query, [email]);
    if(result.length ===0){
      return { status: false, message: "User not found" };
    }
    const hashedPassword = result.password;
    if (!hashedPassword) {
      return { status: false, message: "User has no password" };
    }
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return { status: false, message: "Invalid password" };
    }
    return { status: true, message: "Login Successful", result };
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user data");
  }
};

// "use strict";

// const { dbHelper } = require("../../../helper");
// const httpStatus = require("http-status");
// const hashHelper = require("../helpers/hashHelper");

// module.exports = async (call, callback) => {
//   try {
//     const email = call.email;
//     const password = call.password;

//     const query = `SELECT * FROM blog.user WHERE email = ?`;
//     const [result] = await connection.executeQuery(query, [email]);

//     if (result.length === 0) {
//       return callback(null, { status: httpStatus.NOT_FOUND, message: "User not found" });
//     }

//     const user = result[0];

//     // Compare password
//     const passwordMatch = await hashHelper.comparePassword(password, user.password);

//     if (!passwordMatch) {
//       return callback(null, { status: httpStatus.UNAUTHORIZED, message: "Invalid password" });
//     }

//     // If password is correct, return the user data
//     return callback(null, { status: httpStatus.OK, message: "Login Successful", user });
//   } catch (error) {
//     console.error(error);
//     return callback(error);
//   }
// };
