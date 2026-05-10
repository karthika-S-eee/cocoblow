const Product = require("../models/product");
const fs = require("fs");
const path = require("path");
const { removeDeletedProductFromCart } = require("./cartController");

// ADD PRODUCT
// exports.addProduct = async (req, res) => {
//   try {
//     let name = req.body.name.trim().toLowerCase().replace(/\s+/g, " ");

//     const existingProduct = await Product.findOne({ name });

//     if (existingProduct) {
//       return res.status(400).json({
//         success: false,
//         message: "Product already exists",
//       });
//     }

//     const product = new Product({
//       name,
//       category: req.body.category,
//       price: req.body.price,
//       stock: req.body.stock,
//       description: req.body.description,
//       image: req.file ? req.file.path : "",
//     });

//     const saved = await product.save();

//     res.status(201).json({
//       success: true,
//       message: "Product Added",
//       product: saved,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const formattedName = name.trim().toLowerCase().replace(/\s+/g, " ");

    const existingProduct = await Product.findOne({ name: formattedName });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    const product = new Product({
      name: formattedName,
      category,
      price,
      stock,
      description,
      image: req.file?.path || "",
       //rating,
    });

    const saved = await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added",
      product: saved,
    });

  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name.trim().toLowerCase(),
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product Updated",
      product: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE PRODUCT + AUTO REMOVE FROM CART
exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // DELETE IMAGE SAFE
    if (product.image) {
      try {
        const imagePath = path.resolve(product.image);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (err) {
        console.log("Image delete skipped:", err.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    // 🔥 REMOVE FROM CART
    await removeDeletedProductFromCart(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted & removed from cart",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // CHECK IF USER ALREADY RATED
    const existingReview =
      product.ratings.find(
        (item) =>
          item.userId.toString() ===
          req.user._id.toString()
      );

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      product.ratings.push({
        userId: req.user._id,
        userName: req.user.name,
        rating,
        comment,
      });
    }

    // CALCULATE AVERAGE RATING
    const total = product.ratings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    product.averageRating =
      total / product.ratings.length;

    await product.save();

    res.status(200).json({
      message: "Rating Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};