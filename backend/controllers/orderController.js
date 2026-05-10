const Product = require("../models/product");
const Order = require("../models/Order");

// ➤ PLACE ORDER (FULL FLOW)
exports.placeOrder = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      phone,
      address,
      pincode,
      products,
      paymentStatus,
      paymentAmount,
      paymentMethod,
    } = req.body;

    // ❌ PAYMENT CHECK
    if (paymentStatus !== "success") {
      return res.status(400).json({
        message: "Payment Failed",
      });
    }

    // ❌ STOCK CHECK FIRST
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} out of stock`,
        });
      }
    }

    // ✅ UPDATE STOCK + PREPARE ORDER PRODUCTS
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      product.stock -= item.quantity;
      product.totalOrders = (product.totalOrders || 0) + item.quantity;
      if (!product.orderHistory) {
        product.orderHistory = [];
      }

      product.orderHistory.push({
        quantity: item.quantity,
        date: new Date(),
      });

      await product.save();

      updatedProducts.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
      });
    }

    // 📦 DELIVERY CALCULATION (example logic)
    const deliveryDays = 3; // you can make dynamic later

    const newOrder = new Order({
      userId,
      customerName,
      phone,
      address,
      pincode,
      paymentMethod,
      products: updatedProducts,
      paymentStatus,
      paymentAmount,
      orderStatus: "processing",
      deliveryDays,
      delivered: false,
      isReceived: false,
      orderedAt: new Date(),
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment Success & Order Confirmed",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};



// ➤ GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ➤ UPDATE ORDER STATUS (processing → received)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, isReceived } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
        isReceived,
      },
      { new: true }
    );

    res.json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};