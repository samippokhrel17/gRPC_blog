"use strict";

const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

(()=>
{
    const postCreate = require("./../sql/create_customer_post_sql");

    module.exports = async(call,callback) =>
    {
let response = {message:"Bad request",status:httpStatus.BAD_REQUEST};
const{description,imageUrl}=call.request;

let accessToken = call.metadata.internalRepr.get("accesstoken")[0]?call.metadata.internalRepr.get("accesstoken")[0]:""
if(!accessToken)
{
    return callback(null,response={message:"accessToken is required",status:httpStatus.BAD_REQUEST});
}


//todo validate accesstoken
try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if(!decoded){
        console.error("failed to decode the token");
        return callback(null,response={message:"failed to decode the token",status:httpStatus})
    }
    
    const dbResponse = await postCreate(call.request);
    if (dbResponse.status === true) {
        response.status = httpStatus.OK;
        response.message = dbResponse.message;
      }
    return callback(null, response={ message: "success", status: httpStatus.OK });
} catch (error) {
    console.error("Failed to decode/verify the token:", error.message);
    return callback(null, response={ message: "token verification failed", status: httpStatus.BAD_REQUEST });
}



//todo create gara 


//post create


// return callback(null,response={message:"success",status:httpStatus.OK})

    }
})
();