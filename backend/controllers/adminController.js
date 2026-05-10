
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