"use strict";
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
console.log(path.resolve(process.cwd(), ".env"));
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { dbHelper } = require("./helper");
const packageDefinition = protoLoader.loadSync("./proto/blog.rpc.proto", {
  keepCase: true,
  longs: "string",
  defaults: true,
});
const port = process.env.GRPC_PORT;
const server = new grpc.Server();
const simpleProto = grpc.loadPackageDefinition(packageDefinition);
// Grpc Methods
// const simpleServiceCtl = require("./modules");

const userServiceLoader = require("./modules/users/sql");
const loginServiceLoader = require("./modules/users/sql");
const getPostServiceLoader = require("./modules/users/sql")


server.addService(simpleProto.example.blog.rpc.blogService.service,{
  registerUser: userServiceLoader.registerUser,
  loginUser: loginServiceLoader.loginUser,
  CreatePostUser:loginServiceLoader.CreatePostUser,
  getAllPost:getPostServiceLoader.getAllPost,
});

server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  async (err, port) => {
    if (err) return err;
    console.log("Server running on port ", port);

    await dbHelper.init();
  }
);
