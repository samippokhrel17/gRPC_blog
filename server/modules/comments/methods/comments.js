"use strict";

(() => {
  const comment = require("./../sql/registerUser_sql");
  const httpStatus = require("http-status");
  module.exports = async (call, callback) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Comment Failed",
      };

      const dbResponse = await comment(call.request);
      if (dbResponse.status === true) {
        response.status = httpStatus.OK;
        response.message = dbResponse.message;
      }
      return callback(null, dbResponse);
    } catch (error) {
      return callback(error);
    }
  };
})();
