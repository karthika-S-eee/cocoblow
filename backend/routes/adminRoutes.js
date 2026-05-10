const express = require("express");
const jwt = require("jsonwebtoken");

const {
  adminLogin,
  registerAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// REGISTER
router.post("/register", registerAdmin);

// LOGIN
router.post("/login", adminLogin);

// LOGOUT
router.post("/logout", (req, res) => {

  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.json({
    message: "Logged out successfully",
  });

});

// VERIFY
router.get("/verify", async (req, res) => {

  try {

    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        isAdmin: false,
        message: "No token found",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        isAdmin: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      isAdmin: true,
      adminId: decoded.id,
    });

  } catch (error) {

    return res.status(500).json({
      isAdmin: false,
      message: error.message,
    });

  }

});

module.exports = router;