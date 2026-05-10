import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";

import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  Search,
  LogOut,
} from "lucide-react";

const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  // USER DATA
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [wishlist, setWishlist] =
    useState([]);

  const [cartItems, setCartItems] =
    useState([]);

  // ==============================
  // FETCH CART
  // ==============================

  const fetchCart = async () => {

    try {

      if (!userId) return;

      const res = await axios.get(
        `https://cocoblowbackend.onrender.com/api/cart/${userId}`
      );

      setCartItems(res.data || []);

    } catch (err) {

      console.log(
        "Cart fetch error:",
        err.response?.data || err.message
      );

    }
  };

  // ==============================
  // FETCH WISHLIST
  // ==============================

  const fetchWishlist = async () => {

    try {

      if (!userId) return;

      const res = await axios.get(
        `https://cocoblowbackend.onrender.com/api/wishlist/user/${userId}`
      );

      setWishlist(res.data || []);

    } catch (err) {

      console.log(
        "Wishlist fetch error:",
        err.response?.data || err.message
      );

    }
  };

  useEffect(() => {

    fetchCart();
    fetchWishlist();

    // CUSTOM EVENT LISTENER
    window.addEventListener(
      "wishListUpdated",
      fetchWishlist
    );

    window.addEventListener(
      "cartUpdated",
      fetchCart
    );

    return () => {

      window.removeEventListener(
        "wishListUpdated",
        fetchWishlist
      );

      window.removeEventListener(
        "cartUpdated",
        fetchCart
      );

    };

  }, [userId]);

  // ==============================
  // COUNTS
  // ==============================

  const cartCount = cartItems.length;

  const wishlistCount = wishlist.length;

  // ==============================
  // SEARCH NAVIGATION
  // ==============================

  const handleSearch = (e) => {

    if (e.key === "Enter") {

      const q = search.trim().toLowerCase();

      if (!q) return;

      if (q.includes("home")) {

        navigate("/");

      } else if (
        q.includes("shop") ||
        q.includes("product")
      ) {

        navigate("/shop");

      } else if (q.includes("cart")) {

        navigate("/cart");

      } else if (q.includes("wish")) {

        navigate("/wishlist");

      } else {

        navigate("/shop");

      }

      setSearch("");
      setSearchOpen(false);

    }
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {

    localStorage.removeItem("userId");

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");

  };

  // ==============================
  // ACTIVE LINK STYLE
  // ==============================

  const navLinkStyle = (path) => {

    const isActive =
      location.pathname === path;

    return `
      relative font-semibold text-lg transition duration-300 pb-1

      ${
        isActive
          ? "text-[#6f7d31] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[3px] after:bg-[#6f7d31] after:rounded-full"
          : "text-[#4d2f1f] hover:text-[#6f7d31]"
      }
    `;
  };

  return (

    <header className="w-full bg-[#f7f1e8] shadow-md border-b border-[#d8c8b5] sticky top-0 z-50">

      {/* MAIN HEADER */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="text-3xl font-extrabold flex items-center tracking-wide"
        >

          <span className="text-[#3b2415] italic font-serif">
            Coco
          </span>

          <span className="text-[#7a8b32] font-black ml-1">
            Blow
          </span>

        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className={navLinkStyle("/")}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={navLinkStyle("/shop")}
          >
            Shop
          </Link>

          <Link
            to="/wishlist"
            className={navLinkStyle("/wishlist")}
          >

            <div className="relative flex items-center gap-2">

              <Heart size={18} />

              <span>Wishlist</span>

              {wishlistCount > 0 && (

                <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                  {wishlistCount}

                </span>

              )}

            </div>

          </Link>

          <Link
            to="/cart"
            className={navLinkStyle("/cart")}
          >

            <div className="relative flex items-center gap-2">

              <ShoppingCart size={18} />

              <span>Cart</span>

              {cartCount > 0 && (

                <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </div>

          </Link>

        </nav>

        {/* ACTION BUTTONS */}

        <div className="flex items-center gap-3 relative">

          {/* SEARCH */}

          <button
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
            className="bg-[#6f7d31] hover:bg-[#5c6828] transition text-white p-2 rounded-xl shadow"
          >

            <Search size={20} />

          </button>

          {/* MENU */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="bg-[#6f7d31] hover:bg-[#5c6828] transition text-white p-2 rounded-xl shadow"
          >

            {menuOpen ? <X /> : <Menu />}

          </button>

          {/* DESKTOP PROFILE */}
          <Link
  to="/profile"
  className="
    hidden md:flex
    w-11 h-11
    rounded-full
    border-2 border-[#6f7d31]
    bg-white
    text-[#6f7d31]
    items-center
    justify-center
    text-lg
    font-bold
    uppercase
    hover:bg-[#f7f1e8]
    transition
  "
>
  {user?.name?.charAt(0) || "U"}
</Link>



          {/* SEARCH BOX */}

          {searchOpen && (

            <div className="absolute top-14 right-0 bg-white border rounded-2xl shadow-lg p-3 z-50">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={handleSearch}
                placeholder="Search pages..."
                className="px-3 py-2 w-64 outline-none rounded-xl"
              />

            </div>

          )}

        </div>

      </div>

      {/* MOBILE NAV */}

      <div className="md:hidden flex justify-around items-center py-3 border-t bg-[#f3eadf]">

        <Link
          to="/"
          className={navLinkStyle("/")}
        >
          Home
        </Link>

        <Link
          to="/shop"
          className={navLinkStyle("/shop")}
        >
          Shop
        </Link>

        {/* WISHLIST */}

        <Link
          to="/wishlist"
          className="relative"
        >

          <Heart
            size={20}
            className={
              location.pathname ===
              "/wishlist"
                ? "text-[#6f7d31]"
                : "text-[#4d2f1f]"
            }
          />

          {wishlistCount > 0 && (

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">

              {wishlistCount}

            </span>

          )}

        </Link>

        {/* CART */}

        <Link
          to="/cart"
          className="relative"
        >

          <ShoppingCart
            size={20}
            className={
              location.pathname === "/cart"
                ? "text-[#6f7d31]"
                : "text-[#4d2f1f]"
            }
          />

          {cartCount > 0 && (

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">

              {cartCount}

            </span>

          )}

        </Link>

      </div>

      {/* DROPDOWN MENU */}

      {menuOpen && (

        <div className="absolute right-4 md:right-6 mt-2 w-64 bg-[#f7f1e8] border shadow-2xl rounded-2xl z-50 overflow-hidden">

          <Link
            to="/about"
            className="block px-5 py-4 hover:bg-[#e9dfd0] transition"
          >
            About Us
          </Link>

          <Link
            to="/order"
            className="block px-5 py-4 hover:bg-[#e9dfd0] transition"
          >
            My Orders
          </Link>

          <Link
            to="/profile"
            className="block px-5 py-4 hover:bg-[#e9dfd0] transition"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-4 hover:bg-[#e9dfd0] transition flex items-center gap-2"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      )}

    </header>
  );
};

export default Header;