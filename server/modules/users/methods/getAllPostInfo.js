"use strict";

(() => {
  const getAllPost = require("../sql/getAllPostInfo_sql");
  const httpStatus = require("http-status");
  module.exports = async (call, callback) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      const dbResponse = await getAllPost(call.request);
      if (dbResponse.status === true) {
        response.status = httpStatus.OK;
        response.message = dbResponse.message;
        response.blog = dbResponse.blog;
      }
      return callback(null, dbResponse);
    } catch (error) {
      return callback(error);
    }
  };
})();
