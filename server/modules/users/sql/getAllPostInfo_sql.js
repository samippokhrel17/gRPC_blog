"use strict";

const httpStatus = require("http-status");

(() => {
  const { dbHelper } = require("../../../helper");
  module.exports = async (call, callback) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let query = await dbHelper.format(
        ` 
        SELECT * FROM
        blog.post`
      );
      const [result] = await dbHelper.executeQuery(query);

      if (result) {
        (response.status = httpStatus.OK),
          (response.message = "Blog Posts Data fetch succesfully"),
          (response.blog = [result]);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error retrievring Data");
    }
  };
})();
