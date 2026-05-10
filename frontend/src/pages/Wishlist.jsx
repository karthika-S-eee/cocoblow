
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const userId = localStorage.getItem("userId");

  // 📦 GET ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ❤️ GET WISHLIST IDS
  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/wishlist/user/${userId}`
      );

      const ids = res.data.map((item) =>
        item.productId ? item.productId._id : item._id
      );

      setWishlistIds(ids);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  // 🔁 TOGGLE WISHLIST
  const toggleWishlist = async (product) => {
    try {
      await axios.post("http://localhost:5000/api/wishlist/toggle", {
        userId,
        productId: product._id,
      });

      // 🔥 refresh wishlist AFTER DB update
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  // ⭐ FILTER ONLY WISHLISTED PRODUCTS (IMPORTANT FIX)
  const wishlistProducts = products.filter((p) =>
    wishlistIds.includes(p._id)
  );

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      <Header />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <p>No products in wishlist</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlistProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    className="h-[220px] w-full object-cover"
                  />

                  {/* ❤️ HEART REMOVE */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                  >
                    <span className="text-red-500">❤️</span>
                  </button>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p className="text-[#6f7d31] font-semibold mt-2">
                    ₹ {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;