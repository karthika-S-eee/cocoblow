
const express = require("express");
const router = express.Router();

const Wishlist = require("../models/Wishlist");

const {
  toggleWishlist,
} = require("../controllers/wishlistController");


// TOGGLE
router.post("/toggle", toggleWishlist);


// GET USER WISHLIST
router.get("/user/:userId", async (req, res) => {

  try {

    const wishlist = await Wishlist.find({
      userId: req.params.userId,
    }).populate("productId");

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;