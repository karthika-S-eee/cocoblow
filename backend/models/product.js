const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    userName: String,

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: String,
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },
    ratings: [reviewSchema],
    
     averageRating: {
      type: Number,
      default: 0,
    },

    // TOTAL PRODUCT ORDERS
    totalOrders: {
      type: Number,
      default: 0,
    },
   
    // ORDER HISTORY
    orderHistory: [
      {
        quantity: {
          type: Number,
          default: 0,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);