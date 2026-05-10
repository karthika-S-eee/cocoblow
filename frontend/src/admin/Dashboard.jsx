import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  PackagePlus,
  Trash2,
  Pencil,
  User,
  BarChart3,
} from "lucide-react";

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [orders, setOrders] = useState([]);

const getOrders = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/orders",{
        withCredentials: true
      }
    );

    setOrders(res.data || []);

  } catch (error) {

    console.log(error);

  }
};
const updateDeliveryDays = async (
  id,
  days
) => {

  try {

    await axios.put(
      `http://localhost:5000/api/orders/delivery/${id}`,
      {
        withCredentials: true
      },
      {
        deliveryDays: days,
      }
    );

    getOrders();

  } catch (error) {

    console.log(error);

  }
};
const markAsReceived = async (id) => {

  try {

    await axios.put(
      `http://localhost:5000/api/orders/received/${id}`,
       {
        withCredentials: true
      }
    );

    getOrders();

  } catch (error) {

    console.log(error);

  }
};
  // FETCH PRODUCTS
  const getProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
           
        withCredentials: true
     
        }
      );

      setProducts(res.data);

      const formattedData = res.data.map((item) => ({
        name: item.name,
        stock: item.stock,
        orders: item.totalOrders || 0,
      }));

      setAnalyticsData(formattedData);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

  const fetchProducts = async () => {
    await getProducts();
    await getOrders();
  };

  fetchProducts();

}, []);

  // TOTAL PRODUCTS
  const totalProducts = products.length;

  // LOW STOCK
  const lowStock = products.filter(
    (item) => item.stock < 10
  ).length;

  // TOTAL ORDERS
  const totalOrders = orders.length;

  return (

    <div className="min-h-screen bg-[#f7f1e8]">

      {/* HEADER */}

      <div className="bg-[#6f7d31] text-white px-6 py-4 shadow-lg">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* LOGO */}
          <h1 className="text-3xl font-extrabold">
            CocoMart Admin
          </h1>

          {/* NAVIGATION */}
          <div className="flex flex-wrap gap-4">

            {/* ADD PRODUCT */}
            <Link
              to="/admin/addProduct"
              className="flex items-center gap-2 bg-white text-[#6f7d31] px-4 py-2 rounded-xl font-semibold"
            >
              <PackagePlus size={18} />
              Add Product
            </Link>

            {/* DELETE PRODUCT */}
            <Link
              to="/admin/deleteProduct"
              className="flex items-center gap-2 bg-white text-[#6f7d31] px-4 py-2 rounded-xl font-semibold"
            >
              <Trash2 size={18} />
              Delete Product
            </Link>

            {/* UPDATE PRODUCT */}
            <Link
              to="/admin/updateProduct"
              className="flex items-center gap-2 bg-white text-[#6f7d31] px-4 py-2 rounded-xl font-semibold"
            >
              <Pencil size={18} />
              Update Product
            </Link>

            {/* ANALYTICS */}
            <Link
              to="/admin/analytics"
              className="flex items-center gap-2 bg-white text-[#6f7d31] px-4 py-2 rounded-xl font-semibold"
            >
              <BarChart3 size={18} />
              Analytics
            </Link>

            {/* PROFILE */}
            <Link
              to="/admin/profile"
              className="flex items-center gap-2 bg-white text-[#6f7d31] px-4 py-2 rounded-xl font-semibold"
            >
              <User size={18} />
              Profile
            </Link>

          </div>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="p-6">

  {/* ORDER LIST */}

  <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

    <h1 className="text-3xl font-bold mb-8 text-[#6f7d31]">
      Order List
    </h1>

    <div className="space-y-6">

      {orders
        .filter((order) => !order.delivered)
        .map((order) => (

          <details
            key={order._id}
            className="border rounded-2xl p-5"
          >

            {/* CUSTOMER NAME */}

            <summary className="cursor-pointer text-xl font-bold text-[#6f7d31]">

              {order.customerName}

            </summary>

            <div className="mt-5 space-y-4">

              {/* CUSTOMER DETAILS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-[#f7f1e8] p-4 rounded-2xl">

                  <p>
                    <strong>Phone:</strong>
                    {" "}
                    {order.phone}
                  </p>

                </div>

                <div className="bg-[#f7f1e8] p-4 rounded-2xl">

                  <p>
                    <strong>Pincode:</strong>
                    {" "}
                    {order.pincode}
                  </p>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="bg-[#f7f1e8] p-4 rounded-2xl">

                <p>
                  <strong>Address:</strong>
                  {" "}
                  {order.address}
                </p>

              </div>

              {/* PRODUCTS */}

              <div>

                <h2 className="font-bold text-lg mb-3">
                  Ordered Products
                </h2>

                <div className="space-y-3">

                  {order.products.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="bg-gray-100 rounded-2xl p-4"
                      >

                        <p>
                          <strong>
                            Product:
                          </strong>
                          {" "}
                          {item.productName}
                        </p>

                        <p>
                          <strong>
                            Quantity:
                          </strong>
                          {" "}
                          {item.quantity}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* STATUS */}

              <div className="flex flex-wrap items-center gap-4">

                <button
                  className="bg-orange-500 text-white px-5 py-2 rounded-xl"
                >
                  {order.orderStatus}
                </button>

                <span className="font-semibold">

                  Delivery Days:
                  {" "}
                  {order.deliveryDays}

                </span>

              </div>

              {/* UPDATE DELIVERY DAYS */}

              <div className="flex flex-wrap gap-3">

                <input
                  type="number"
                  placeholder="Delivery Days"
                  className="border rounded-xl px-4 py-2"

                  value={order.tempDays || ""}

                  onChange={(e) => {

                    setOrders((prev) =>
                      prev.map((item) =>
                        item._id === order._id
                          ? {
                              ...item,
                              tempDays:
                                e.target.value,
                            }
                          : item
                      )
                    );

                  }}
                />

                <button
                  onClick={() =>
                    updateDeliveryDays(
                      order._id,
                      order.tempDays
                    )
                  }
                  className="bg-blue-500 text-white px-5 py-2 rounded-xl"
                >
                  Submit
                </button>

              </div>

              {/* RECEIVED BUTTON */}

              <button
                onClick={() =>
                  markAsReceived(order._id)
                }
                className="bg-green-500 text-white px-5 py-2 rounded-xl"
              >
                Received
              </button>

            </div>

          </details>

        ))}

    </div>

  </div>

</div>
      <div className="p-6">

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* TOTAL ORDERS */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500 text-sm">
              No of Orders
            </h2>

            <h1 className="text-4xl font-bold text-[#6f7d31] mt-2">
              {totalOrders}
            </h1>

          </div>

          {/* TOTAL PRODUCTS */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500 text-sm">
              Total Products
            </h2>

            <h1 className="text-4xl font-bold text-[#6f7d31] mt-2">
              {totalProducts}
            </h1>

          </div>

          {/* LOW STOCK */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500 text-sm">
              Low Stock Products
            </h2>

            <h1 className="text-4xl font-bold text-red-500 mt-2">
              {lowStock}
            </h1>

          </div>

        </div>
        {/* ANALYTICS SECTION */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* BAR CHART */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-2xl font-bold text-[#4d2f1f] mb-6">
      Product Analytics
    </h2>

    <ResponsiveContainer
      width="100%"
      height={400}
    >

      <BarChart data={analyticsData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Legend />

        {/* STOCK */}
        <Bar
          dataKey="stock"
          fill="#6f7d31"
          radius={[10, 10, 0, 0]}
        />

        {/* ORDERS */}
        <Bar
          dataKey="orders"
          fill="#f59e0b"
          radius={[10, 10, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/* PIE CHART */}

  

</div>

        

      </div>
    </div>
  );
};

export default Dashboard;