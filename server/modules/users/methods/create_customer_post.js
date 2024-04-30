"use strict";

const httpStatus = require("http-status");

(()=>
{

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



//todo create gara 


//post create


return callback(null,response={message:"success",status:httpStatus.OK})

    }
})
();