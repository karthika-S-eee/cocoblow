// const User = require('../models/User')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const crypto = require('crypto')
// const sendEmail = require('../utils/sendEmail')

// // exports.register = async (req, res) => {
// //   try {
// //     const { name, email, password, phoneNumber, address } = req.body

// //     const existingUser = await User.findOne({ email })

// //     if (existingUser) {
// //       return res.status(400).json({
// //         message: 'User already exists',
// //       })
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10)

// //     const verificationToken = crypto.randomBytes(32).toString('hex')

// //     const user = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       phoneNumber,
// //       address,
// //       verificationToken,
// //     })

// //     try {
// //       await sendEmail(email, verificationToken)
// //     } catch (emailError) {
// //       console.log('Email Error:', emailError.message)
// //     }

// //     res.status(201).json({
// //       message: 'Registered Successfully. Verify Email.',
// //     })
// //   } catch (error) {
// //     res.status(500).json(error)
// //   }
// // }
// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       phoneNumber,
//       address,
//     } = req.body

//     const existingUser = await User.findOne({ email })

//     if (existingUser) {
//       return res.status(400).json({
//         message: 'User already exists',
//       })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const verificationToken =
//       crypto.randomBytes(32).toString('hex')

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       address,
//       verificationToken,
//       isVerified: true,
//     })

//     // Send response immediately
//     res.status(201).json({
//       success: true,
//       message: 'Registered Successfully',
//     })

//     // Send email in background
//     sendEmail(email, verificationToken)
//       .then(() => {
//         console.log('Email Sent')
//       })
//       .catch((err) => {
//         console.log('Email Error:', err.message)
//       })

//   } catch (error) {
//     console.log(error)

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// exports.verifyEmail = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       verificationToken: req.params.token,
//     })

//     if (!user) {
//       return res.status(400).json({
//         message: 'Invalid Token',
//       })
//     }

//     user.isVerified = true
//     user.verificationToken = ''

//     await user.save()

//     res.json({
//       message: 'Email Verified Successfully',
//     })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     const user = await User.findOne({ email })

//     if (!user) {
//       return res.status(400).json({
//         message: 'User not found',
//       })
//     }

//     if (!user.isVerified) {
//       return res.status(400).json({
//         message: 'Verify your email first',
//       })
//     }

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     )

//     if (!isMatch) {
//       return res.status(400).json({
//         message: 'Invalid credentials',
//       })
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: '7d',
//       }
//     )

//     res.json({
//       token,
//       user,
//     })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phoneNumber,
      address,
    } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      address,
      role: "user",
    });

    return res.status(201).json({
      message: "Registration Successful",
      user,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
      role: "user",
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  registerUser,
  loginUser,
};