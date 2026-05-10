// const Cart =require( "../models/cart.js")
// const Product= require( "../models/product.js")

// // ADD TO CART
// export const addToCart = async (req, res) => {
//   try {

//     const { userId, productId, quantity } = req.body

//     const product = await Product.findById(productId)

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" })
//     }

//     const existing = await Cart.findOne({ userId, productId })

//     if (existing) {
//       existing.quantity += quantity
//       await existing.save()
//       return res.json(existing)
//     }

//     const cartItem = await Cart.create({
//       userId,
//       productId,
//       quantity
//     })

//     res.status(201).json(cartItem)

//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }


// // GET USER CART
// export const getCart = async (req, res) => {
//   try {

//     const { userId } = req.params

//     const cart = await Cart.find({ userId })
//       .populate("productId")

//     res.json(cart)

//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }


// // REMOVE FROM CART
// export const removeFromCart = async (req, res) => {
//   try {

//     const { userId, productId } = req.body

//     await Cart.deleteOne({ userId, productId })

//     res.json({ message: "Removed from cart" })

//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }


// // CLEAN CART WHEN PRODUCT DELETED
// export const removeDeletedProductFromCart = async (productId) => {
//   await Cart.deleteMany({ productId })
// }

const Cart = require("../models/cart.js");
const Product = require("../models/product.js");

// ADD TO CART
const addToCart = async (req, res) => {
    //console.log("ADD TO CART HIT:", req.body);
  try {
    const { userId, productId} = req.body;
    const quantity = Number(req.body.quantity || 1);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json(existing);
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });
    res.status(201).json(cartItem);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET CART
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.find({ userId }).populate("productId");

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { userId } = req.body;

    const deleted = await Cart.findOneAndDelete({
      _id: cartId,
      userId: userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Removed successfully" });
  } catch (err) {
    console.log("DELETE CART ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// AUTO CLEAN WHEN PRODUCT DELETED
const removeDeletedProductFromCart = async (productId) => {
  await Cart.deleteMany({ productId });
};


// EXPORTS
module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  removeDeletedProductFromCart,
};