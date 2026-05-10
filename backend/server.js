

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({

    origin: ["http://localhost:5173", "https://cocoblow.vercel.app/"],
    credentials: true
  })
);

app.use(express.json());

app.use(cookieParser());

// SESSION
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// STATIC
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
