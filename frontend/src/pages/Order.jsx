import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // FETCH USER ORDERS
  const getOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/orders/user/${userId}`
      );

      setOrders(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // RECEIVE ORDER
  const receiveOrder = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/received/${id}`
      );

      alert("Order received successfully");

      getOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update order");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] p-6">
      <Header />

      <h1 className="text-3xl font-bold mb-8 text-[#6f7d31]">
        My Orders
      </h1>

      {/* LOADING */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* CUSTOMER INFO */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#4d2f1f]">
                  {order.customerName}
                </h2>

                <p className="text-gray-600">
                  📞 {order.phone}
                </p>

                <p className="text-gray-600">
                  📍 {order.address}, {order.pincode}
                </p>
              </div>

              {/* PRODUCTS */}
              <div className="mb-4">
                <h3 className="font-bold mb-2">
                  Products
                </h3>

                <div className="space-y-2">
                  {order.products?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-xl"
                    >
                      <p>
                        <strong>Name:</strong>{" "}
                        {item.productName}
                      </p>

                      <p>
                        <strong>Qty:</strong>{" "}
                        {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORDER DETAILS */}
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <span className="bg-orange-100 px-3 py-1 rounded-xl">
                  Status: {order.orderStatus || "Pending"}
                </span>

                <span className="bg-blue-100 px-3 py-1 rounded-xl">
                  Delivery Days: {order.deliveryDays || "-"}
                </span>

                <span className="bg-green-100 px-3 py-1 rounded-xl">
                  Payment: ₹ {order.paymentAmount}
                </span>
                {/* ORDER DATE */}
  <span className="bg-purple-100 px-3 py-1 rounded-xl">
    Date:{" "}
    {new Date(order.createdAt).toLocaleDateString()}
  </span>

  {/* ORDER TIME */}
  <span className="bg-pink-100 px-3 py-1 rounded-xl">
    Time:{" "}
    {new Date(order.createdAt).toLocaleTimeString()}
  </span>
              </div>

              {/* FLAGS */}
              <div className="flex flex-wrap items-center gap-4 text-sm">

                <span className="text-gray-600">
                  Delivered:{" "}
                  {order.delivered ? "Yes" : "No"}
                </span>

                <span className="text-gray-600">
                  Received:{" "}
                  {order.isReceived ? "Yes" : "No"}
                </span>

                {/* RECEIVE BUTTON */}
                {!order.isReceived && (
                  <button
                    onClick={() => receiveOrder(order._id)}
                    className="bg-[#6f7d31] text-white px-5 py-2 rounded-xl"
                  >
                    Receive Order
                  </button>
                )}

                {order.isReceived && (
                  <span className="bg-green-200 text-green-800 px-4 py-2 rounded-xl">
                    Order Received
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;