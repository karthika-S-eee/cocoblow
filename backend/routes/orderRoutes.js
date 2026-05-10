const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/product");
const Cart = require("../models/cart");

const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");


// ==============================
// 👤 USER ROUTES
// ==============================


// ➤ PLACE ORDER
router.post("/place", placeOrder);


// ➤ GET USER ORDERS
router.get("/user/:userId", getUserOrders);

router.delete("/clear/:userId", async (req, res) => {
  try {
    await Cart.deleteMany({
      userId: req.params.userId,
    });

    res.json({
      message: "Cart cleared successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==============================
// 🛠️ ADMIN ROUTES
// ==============================


// ➤ GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/received/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        delivered: true,
        isReceived: true,
        orderStatus: "received",
      },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ➤ UPDATE ORDER STATUS
router.put("/update/:id", updateOrderStatus);


// ➤ UPDATE DELIVERY DAYS
router.put("/delivery/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryDays: req.body.deliveryDays },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ➤ MARK AS RECEIVED
router.put("/received/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        delivered: true,
        orderStatus: "received",
      },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==============================
// ❌ CANCEL ORDER + RESTORE STOCK
// ==============================

router.put("/cancel/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ❌ prevent cancel if already delivered
    if (order.delivered === true || order.orderStatus === "received") {
      return res.status(400).json({
        message: "Cannot cancel delivered order",
      });
    }

    // 🔄 RESTORE PRODUCT STOCK
    for (const item of order.products) {
      const product = await Product.findById(item.productId);

      if (product) {
        product.stock += item.quantity;

        // optionally reduce totalOrders
        product.totalOrders = Math.max(
          0,
          (product.totalOrders || 0) - item.quantity
        );

        await product.save();
      }
    }

    // ❌ UPDATE ORDER STATUS
    order.orderStatus = "cancelled";

    await order.save();

    res.json({
      message: "Order cancelled & stock restored",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;