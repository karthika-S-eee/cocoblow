const express = require("express");
const Cart = require("../models/cart");
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.post("/remove", removeFromCart);
router.delete("/:id", removeFromCart);
router.put("/:productId", async (req, res) => {
  try {
    const { quantity, userId } = req.body;

    const updated = await Cart.findOneAndUpdate(
      {
        userId: userId,
        productId: req.params.productId,
      },
      {
        $set: { quantity: quantity },
      },
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;