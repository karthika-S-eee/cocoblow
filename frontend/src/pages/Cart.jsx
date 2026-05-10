
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Reviews from "./Reviews";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const userId = localStorage.getItem("userId");

  // FETCH CART
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `https://cocoblowbackend.onrender.com/api/cart/${userId}`
      );

      setCart(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // REMOVE ITEM
  const removeItem = async (item) => {
    try {
      await axios.delete(
        `https://cocoblowbackend.onrender.com/api/cart/${item._id}`,
        {
          data: { userId },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // INCREASE QTY
  const increaseQty = async (item) => {
    try {
      await axios.put(
        `https://cocoblowbackend.onrender.com/api/cart/${item.productId._id}`,
        {
          quantity: item.quantity + 1,
          userId,
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // DECREASE QTY
  const decreaseQty = async (item) => {
    try {
      if (item.quantity > 1) {
        await axios.put(
          `https://cocoblowbackend.onrender.com/api/cart/${item.productId._id}`,
          {
            quantity: item.quantity - 1,
            userId,
          }
        );

        fetchCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL PRICE
  const total = cart.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  // PLACE ORDER + FAKE PAYMENT
  const handlePayment = async () => {
    if (
      !formData.customerName ||
      !formData.address ||
      !formData.phone ||
      !formData.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      // Fake Payment Delay
      alert("Processing Payment...");

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      // ORDER DATA
      const orderData = {
  userId,
  customerName: formData.customerName,
  address: formData.address,
  phone: formData.phone,
  pincode: formData.pincode,

  paymentMethod: formData.payment,

  paymentStatus: "success",

  paymentAmount: total,

  products: cart.map((item) => ({
    productId:
      item.productId?._id || item.productId,

    productName:
      item.productId?.name || item.name,

    quantity: item.quantity,
  })),
};

console.log(orderData);

      // SAVE ORDER
      await axios.post(
        "https://cocoblowbackend.onrender.com/api/orders/place",
        orderData
      );

      // CLEAR CART
      await axios.delete(
        `https://cocoblowbackend.onrender.com/api/orders/clear/${userId}`
      );

      alert("Order placed successfully 🎉");

      setOpenCheckout(false);
      window.dispatchEvent(
  new Event("cartUpdated")
);
      
      // REDIRECT
      navigate("/order");

    } catch (error) {
      console.log(error.response.data);
      alert("Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      <Header />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8 text-[#4d2f1f]">
          My Cart
        </h1>

        {cart.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          <>
            {/* PRODUCTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000/${item.productId.image}`}
                    className="h-[220px] w-full object-cover"
                    alt={item.productId.name}
                  />

                  <div className="p-4">
                    <h2 className="text-xl font-bold">
                      {item.productId.name}
                    </h2>

                    <p className="text-[#6f7d31] font-semibold mt-2">
                      ₹ {item.productId.price}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-8 h-8 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="w-8 h-8 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* SUBTOTAL */}
                    <p className="mt-4 font-semibold">
                      Subtotal: ₹{" "}
                      {item.productId.price * item.quantity}
                    </p>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeItem(item)}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="mt-10 bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-[#4d2f1f]">
                  Order Summary
                </h2>

                <p className="mt-2 text-[#6f7d31] text-2xl font-bold">
                  Total Price: ₹ {total}
                </p>
              </div>

              <button
                onClick={() => setOpenCheckout(true)}
                className="bg-[#6f7d31] hover:bg-[#5b6727] transition text-white px-10 py-3 rounded-xl font-bold shadow-md"
              >
                Place Order
              </button>

            </div>
          </>
        )}
      </div>

      {/* CHECKOUT MODAL */}
{openCheckout && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto p-6">

      {/* CLOSE */}
      <button
        onClick={() => setOpenCheckout(false)}
        className="absolute top-4 right-4 text-2xl text-gray-500"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-[#6f7d31]">
        Checkout Details
      </h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Customer Name"
        className="w-full border p-3 rounded-xl mb-4 outline-none"
        value={formData.customerName}
        onChange={(e) =>
          setFormData({
            ...formData,
            customerName: e.target.value,
          })
        }
      />

      {/* ADDRESS */}
      <textarea
        placeholder="Address"
        rows="4"
        className="w-full border p-3 rounded-xl mb-4 outline-none"
        value={formData.address}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: e.target.value,
          })
        }
      />

      {/* PHONE */}
      <input
        type="text"
        placeholder="Phone"
        className="w-full border p-3 rounded-xl mb-4 outline-none"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
      />

      {/* PINCODE */}
      <input
        type="text"
        placeholder="Pincode"
        className="w-full border p-3 rounded-xl mb-4 outline-none"
        value={formData.pincode}
        onChange={(e) =>
          setFormData({
            ...formData,
            pincode: e.target.value,
          })
        }
      />

      {/* REVIEWS */}
      <div className="bg-[#f7f1e8] rounded-2xl p-4 mb-6">

        <h2 className="text-xl font-bold mb-4 text-[#6f7d31]">
          Product Reviews
        </h2>

        <Reviews />

      </div>

      {/* PAYMENT */}
      <select
        className="w-full border p-3 rounded-xl mb-6 outline-none"
        value={formData.payment}
        onChange={(e) =>
          setFormData({
            ...formData,
            payment: e.target.value,
          })
        }
      >
        <option>Cash on Delivery</option>
        <option>UPI</option>
        <option>Debit Card</option>
        <option>Credit Card</option>
      </select>

      {/* PAY BUTTON */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-[#6f7d31] text-white py-3 rounded-xl font-bold"
      >
        {loading
          ? "Processing Payment..."
          : `Pay ₹ ${total}`}
      </button>

    </div>

  </div>

)}
      
    </div>
  );
};

export default Cart;