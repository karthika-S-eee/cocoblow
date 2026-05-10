// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     let token;

//     if (req.session?.token) {
//       token = req.session.token;
//     }

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();
//   } catch (error) {
//     res.status(401).json({
//       message: "Invalid Token",
//     });
//   }
// };

// const adminMiddleware = (
//   req,
//   res,
//   next
// ) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       message: "Admin Access Only",
//     });
//   }

//   next();
// };

// module.exports = {
//   authMiddleware,
//   adminMiddleware,
// };
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = async (req, res, next) => {

  try {

    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Invalid Token",
    });

  }

};