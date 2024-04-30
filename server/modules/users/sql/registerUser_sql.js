"use strict";

const hashHelper = require("../helpers/hashHelper");
const httpStatus = require("http-status");

(() => {
  const { dbHelper } = require("../../../helper");
  module.exports = async (call, callback) => {
    let connection;
    try {

      let response = { status: false, message: "Register Failed" };
      let generateSalt = await hashHelper.generateSalt();
      let hashPassword = await hashHelper.hashPassword(
        call.password, generateSalt
      );
      

      const [existingEmail] = await dbHelper.query(
        `SELECT * FROM blog.user WHERE email = ?`,
        [call.email]
      );

      if (existingEmail.length > 0) {
        return { status: httpStatus.BAD_REQUEST, message: "Email already exists" };
      }

      // Check if phone number already exists
      const [existingPhoneNumber] = await dbHelper.query(
        `SELECT * FROM blog.user WHERE phoneNumber = ?`,
        [call.phoneNumber]
      );

      if (existingPhoneNumber.length > 0) {
        return { status: httpStatus.BAD_REQUEST, message: "Phone number already exists" };
      }


      let insert = {
        FirstName: call.FirstName,
        LastName: call.LastName,
        email: call.email,
        password: hashPassword,
        phoneNumber: call.phoneNumber,
    };
    const [rows] = await dbHelper.query(
        `insert into blog.user set ? `,
        insert
      );
      if (rows.insertId > 0) {
        response.status = true;
        response.message = "Created Successfully";
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
})();
