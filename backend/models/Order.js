const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    customerName: String,
    phone: String,
    address: String,
    pincode: String,
    paymentMethod: String,

    products: [
      {
        productId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
},
        productName: String,
        quantity: Number,
      },
    ],

    paymentStatus: String,
    paymentAmount: Number,

    orderStatus: {
      type: String,
      default: "processing",
    },

    deliveryDays: Number,

    delivered: {
      type: Boolean,
      default: false,
    },

    isReceived: {
      type: Boolean,
      default: false,
    },

    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);