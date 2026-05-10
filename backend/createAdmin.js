// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// require('dotenv').config()

// const User = require('./models/User')

// mongoose.connect(process.env.MONGO_URI)

// const createAdmin = async () => {
//   try {
//     // Hash Password
//     const hashedPassword = await bcrypt.hash(
//       'admin123',
//       10
//     )

//     // Create Admin
//     await User.create({
//       name: 'Admin',
//       email: 'admin@gmail.com',
//       password: hashedPassword,
//       role: 'admin',
//       isVerified: true,
//     })

//     console.log('Admin Created Successfully')

//     process.exit()
//   } catch (error) {
//     console.log(error)
//     process.exit()
//   }
// }

// createAdmin()