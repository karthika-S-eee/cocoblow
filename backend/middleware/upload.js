// const multer = require("multer");

// const path = require("path");

// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {

//     cb(null, "uploads/");
//   },

//   filename: function (req, file, cb) {

//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   },

// });

// // FILE FILTER
// const fileFilter = (req, file, cb) => {

//   const allowedTypes = /jpg|jpeg|png|webp/;

//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );

//   const mimetype = allowedTypes.test(
//     file.mimetype
//   );

//   if (extname && mimetype) {

//     return cb(null, true);

//   } else {

//     cb(
//       new Error(
//         "Only Images are allowed"
//       )
//     );
//   }
// };

// const upload = multer({

//   storage,

//   fileFilter,

// });

// module.exports = upload;
// middleware/upload.js

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;