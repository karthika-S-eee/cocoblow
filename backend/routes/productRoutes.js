const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addRating,
} = require("../controllers/productController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin, verifyAdmin } = require("../middleware/adminMiddleware");

// ✅ correct import
const upload = require("../middleware/upload");

// USER
router.get("/", getProducts);

// ADMIN ADD
router.post(
  "/add",
  
  verifyAdmin,
  upload.single("image"),
  addProduct
);

router.post(
  "/rating/:id",
  verifyToken,
  addRating
);

// ADMIN UPDATE
router.put(
  "/update/:id",
  
  verifyAdmin,
  upload.single("image"),
  updateProduct
);

// DELETE
router.delete(
  "/delete/:id",
 
  verifyAdmin,
  deleteProduct
);


module.exports = router;