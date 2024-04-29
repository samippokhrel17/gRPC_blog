// "use strict";
// const httpStatus = require("http-status");
// const loginUser = require("../sql/loginUser_sql");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const dotenv = require("dotenv");

// dotenv.config({});

// const generateTokens = (userId) => {
//   const accessToken = jwt.sign(
//     { userId }, 
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "55m",
//     }
//   );
//   const refreshToken = jwt.sign(
//     { userId }, 
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: "7d",
//     }
//   );
//   return { accessToken, refreshToken };
// };

// module.exports = async (req, res) => {
//   try {
//     let response = {
//         status: httpStatus.BAD_REQUEST,
//         message: "Register Failed",
//       };
    



//     const dbResponse = await loginUser(call.request);
    

//     if (dbResponse.status === true) {
//         response.status = httpStatus.OK;
//         response.message = dbResponse.message;
//       }

//     const user = dbResponse.user;
//     const hashedPassword = user.password;

//     const passwordMatch = await bcrypt.compare(password, hashedPassword);

//     if (!passwordMatch) {
//         return callback(null, {
//             status: httpStatus.UNAUTHORIZED,
//             message: "Invalid password"
//           });
//     }

//     const { accessToken, refreshToken } = generateTokens(user.id);
//     return callback(null, {
//         status: httpStatus.OK,
//         message: "Login Successful",
//         accessToken,
//         refreshToken,
//       });
//   } catch (error) {
//     console.error(error);
//     return callback(error);
//   }
// };


"use strict";
const httpStatus = require("http-status");
const loginUser = require("../sql/registerUser_sql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config({});

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "55m",
    }
  );
  const refreshToken = jwt.sign(
    { userId }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

module.exports = async (call, callback) => {
  try {
    let response = {
      status: httpStatus.BAD_REQUEST,
      message: "Register Failed",
    };

    const dbResponse = await loginUser(call.request);

    if (dbResponse.status === true) {
      response.status = httpStatus.OK;
      response.message = dbResponse.message;

      const user = dbResponse.user;
      const hashedPassword = user.password;

      const passwordMatch = await bcrypt.compare(call.request.password, hashedPassword);

      if (!passwordMatch) {
        return callback(null, {
          status: httpStatus.UNAUTHORIZED,
          message: "Invalid password"
        });
      }

      const { accessToken, refreshToken } = generateTokens(user.id);
      return callback(null, {
        status: httpStatus.OK,
        message: "Login Successful",
        accessToken,
        refreshToken,
      });
    } else {
      return callback(null, response);
    }
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
