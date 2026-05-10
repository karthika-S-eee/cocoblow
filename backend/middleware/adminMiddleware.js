// module.exports = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({
//       message: 'Admin only',
//     })
//   }

//   next()
// }
const jwt = require("jsonwebtoken");

// exports.verifyAdmin = async (req, res, next) => {

//   try {

//     const token = req.cookies.adminToken;

//     if (!token) {
//       return res.status(401).json({
//         isAdmin: false,
//         message: "No token",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     if (decoded.role !== "admin") {
//       return res.status(403).json({
//         isAdmin: false,
//         message: "Not admin",
//       });
//     }

//     req.admin = decoded;

//     next();

//   } catch (error) {

//     console.log(error);

//     return res.status(401).json({
//       isAdmin: false,
//       message: "Invalid token",
//     });

//   }

// };
exports.isAdmin = async (req, res, next) => {
  try {

    // CHECK USER LOGIN
    if (!req.user) {
      return res.status(401).json({
        message: "Please Login",
      });
    }

    // CHECK ADMIN ROLE
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied. Admin Only",
      });
    }

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// exports.verifyAdmin = async (req, res) => {
//   try {
//     const token = req.cookies.adminToken;

//     if (!token) {
//       return res.status(401).json({ isAdmin: false });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ isAdmin: false });
//     }

//     return res.json({ isAdmin: true });

//   } catch (error) {
//     return res.status(401).json({ isAdmin: false });
//   }
// };