const Wishlist = require("../models/Wishlist");

// TOGGLE WISHLIST (ADD / REMOVE)
const toggleWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

   // console.log("REQ BODY:", req.body);

    const existing = await Wishlist.findOne({ userId, productId });

    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      return res.json({ added: false, message: "Removed" });
    }

    const newItem = new Wishlist({ userId, productId });
    await newItem.save();

    res.json({ added: true, message: "Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET USER WISHLIST
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    //console.log("👉 Incoming userId:", userId);

    const wishlist = await Wishlist.find({ userId }).populate("productId");

    const products = wishlist.map((item) => item.productId);

   // console.log("👉 Final products:", products);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  toggleWishlist,
  getWishlist,
};