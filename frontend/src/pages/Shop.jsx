
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

import Header from "../components/Header";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // ❤️ wishlist state (IMPORTANT FIX)
  const [wishlistIds, setWishlistIds] = useState([]);

  const userId = localStorage.getItem("userId");

  // 📦 FETCH PRODUCTS
  useEffect(() => {
    axios
      .get("https://cocoblowbackend.onrender.com/api/products")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ❤️ FETCH WISHLIST FROM BACKEND
  const fetchWishlist = async () => {
    try {
      if (!userId) return;

      const res = await axios.get(
        `https://cocoblowbackend.onrender.com/api/wishlist/user/${userId}`
      );
       const ids = res.data.map(
      (item) => item._id
    );

      setWishlistIds(ids);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 🛒 ADD TO CART
  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      await axios.post("https://cocoblowbackend.onrender.com/api/cart/add", {
        userId,
        productId: selectedProduct._id,
        quantity: qty,
      });
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Added to cart");
      setSelectedProduct(null);
     // setQty(1);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add to cart");
    }
  };

  // ❤️ WISHLIST TOGGLE (FIXED)
  const toggleWishlist = async (product) => {
    try {
      const productId = product._id;

      if (!userId || !productId) return;

      // ⚡ instant UI update
      setWishlistIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );

      const res = await axios.post(
        "https://cocoblowbackend.onrender.com/api/wishlist/toggle",
        {
          userId,
          productId,
        }
      );
       window.dispatchEvent(
      new Event("wishlistUpdated")
    );

      if (res.data.added) {
        toast.success("Added to wishlist");
      } else {
        toast.success("Removed from wishlist");
      }
      
    } catch (err) {
      console.log(err);
      toast.error("Wishlist error");

      // rollback if error
      fetchWishlist();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      <Header />

      {/* HERO */}
      <div className="bg-[#6f7d31] py-14 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          Coconut Shop
        </h1>
        <p className="text-white/80 mt-3 text-sm md:text-lg max-w-2xl mx-auto">
          Explore natural, eco-friendly and sustainable coconut products.
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {items.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={`https://cocoblowbackend.onrender.com/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-[220px] object-cover"
                />

                {/* ❤️ HEART BUTTON */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-xl"
                >
                  {wishlistIds.includes(product._id) ? (
                    <span className="text-red-500">❤️</span>
                  ) : (
                    <span className="text-gray-400">🤍</span>
                  )}
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#4d2f1f]">
                  {product.name}
                </h3>

                <p className="text-[#6f7d31] font-semibold mt-2 text-xl">
                  ₹ {product.price}
                </p>

                <p className="text-gray-500 mt-1 text-sm">
                  Stock: {product.stock}
                </p>

                {/* CART BUTTON */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full mt-4 bg-[#6f7d31] text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <div className="flex items-center gap-2 mt-2">

                 <span className="text-yellow-500">
                     ★
                 </span>

                 <span>
                   {product.averageRating?.toFixed(1) || 0}
                 </span>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            <h2 className="text-xl font-bold mb-2">
              {selectedProduct.name}
            </h2>

            <input
              type="number"
              value={qty}
              min="1"
              onChange={(e) => setQty(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />

            <button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-[#6f7d31] text-white py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full mt-2 text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;