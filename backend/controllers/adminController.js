// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // ADMIN LOGIN
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await User.findOne({
//       email: email.toLowerCase(),
//       role: "admin",
//     });

//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // CREATE TOKEN
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // ✅ HTTP ONLY COOKIE
//     res.cookie("adminToken", token, {
//       httpOnly: true,      // not accessible in JS (important)
//       secure: false,       // true in production (HTTPS)
//       sameSite: "lax",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     return res.status(200).json({
//       message: "Admin Login Successful",
//       admin,
//     });

//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // REGISTER ADMIN
// const registerAdmin = async (req, res) => {
//   try {
//     const { admin_name, email, password } = req.body;

//     const existingAdmin = await User.findOne({
//       email: email.toLowerCase(),
//     });

//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await User.create({
//       admin_name,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       role: "admin",
//     });

//     res.status(201).json({
//       message: "Admin Registered Successfully",
//       admin,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // VERIFY ADMIN (IMPORTANT FIXED)
// const verifyAdmin = async (req, res) => {
//   try {
//     const token = req.cookies.adminToken;

//     if (!token) {
//       return res.status(401).json({ isAdmin: false });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ isAdmin: false });
//     }

//     return res.status(200).json({ isAdmin: true });

//   } catch (error) {
//     return res.status(401).json({ isAdmin: false });
//   }
// };

// module.exports = {
//   adminLogin,
//   registerAdmin,
//   verifyAdmin,
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ADMIN LOGIN
const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await User.findOne({
      email: email.toLowerCase(),
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // STORE TOKEN IN COOKIE
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Admin Login Successful",
      admin,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

// REGISTER ADMIN
const registerAdmin = async (req, res) => {

  try {

    const {
      admin_name,
      email,
      password,
    } = req.body;

    const existingAdmin = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await User.create({
      admin_name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      message: "Admin Registered Successfully",
      admin,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  adminLogin,
  registerAdmin,
};