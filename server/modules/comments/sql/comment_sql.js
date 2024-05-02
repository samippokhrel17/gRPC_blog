"use strict";

const hashHelper = require("../helpers/hashHelper");
const httpStatus = require("http-status");

(() => {
  const { dbHelper } = require("../../../helper");
  module.exports = async (call, callback) => {

    try {
      
      let insert = {
        post_id: call.post_id,
        comment: call.comment,
    };
    const [rows] = await dbHelper.query(
        `insert into blog.post set ? `,
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
