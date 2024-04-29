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
    } finally {
      if (connection) dbHelper.releaseConnection(connection);
    }
  };
})();
