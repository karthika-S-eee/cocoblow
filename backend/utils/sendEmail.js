// const nodemailer = require('nodemailer')

// const sendEmail = async (email, token) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   })

//   const verificationLink = `http://localhost:5000/api/auth/verify/${token}`

//   await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: email,
//     subject: 'Email Verification',
//     html: `
//       <h2>Verify Your Email</h2>
//       <a href="${verificationLink}">
//         Click Here To Verify
//       </a>
//     `,
//   })
// }

// module.exports = sendEmail