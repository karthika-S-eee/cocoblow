import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import AdminHeader from "./AdminHeader";

const Analytics = () => {

  const [products, setProducts] = useState([]);

  const [chartData, setChartData] =
    useState([]);

  const [revenue, setRevenue] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });

  // =========================
  // GET PRODUCTS
  // =========================

  const getProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          withCredentials: true,
        }
      );

      setProducts(res.data);

      const today = new Date();

      let dailyRevenue = 0;
      let weeklyRevenue = 0;
      let monthlyRevenue = 0;
      let yearlyRevenue = 0;

      const formattedData = res.data.map(
        (item) => {

          // DAILY ORDERS
          const dailyOrders =
            item.orderHistory
              ?.filter((order) => {

                const orderDate =
                  new Date(order.date);

                return (
                  orderDate.toDateString() ===
                  today.toDateString()
                );
              })
              .reduce(
                (sum, order) =>
                  sum + order.quantity,
                0
              );

          // WEEKLY ORDERS
          const weeklyOrders =
            item.orderHistory
              ?.filter((order) => {

                const orderDate =
                  new Date(order.date);

                const diffTime =
                  today - orderDate;

                const diffDays =
                  diffTime /
                  (1000 * 60 * 60 * 24);

                return diffDays <= 7;

              })
              .reduce(
                (sum, order) =>
                  sum + order.quantity,
                0
              );

          // MONTHLY ORDERS
          const monthlyOrders =
            item.orderHistory
              ?.filter((order) => {

                const orderDate =
                  new Date(order.date);

                return (
                  orderDate.getMonth() ===
                    today.getMonth() &&
                  orderDate.getFullYear() ===
                    today.getFullYear()
                );
              })
              .reduce(
                (sum, order) =>
                  sum + order.quantity,
                0
              );

          // YEARLY ORDERS
          const yearlyOrders =
            item.orderHistory
              ?.filter((order) => {

                const orderDate =
                  new Date(order.date);

                return (
                  orderDate.getFullYear() ===
                  today.getFullYear()
                );
              })
              .reduce(
                (sum, order) =>
                  sum + order.quantity,
                0
              );

          // =========================
          // REVENUE CALCULATION
          // =========================

          dailyRevenue +=
            dailyOrders * item.price;

          weeklyRevenue +=
            weeklyOrders * item.price;

          monthlyRevenue +=
            monthlyOrders * item.price;

          yearlyRevenue +=
            yearlyOrders * item.price;

          return {

            name: item.name,

            stock: item.stock,

            totalOrders:
              item.totalOrders || 0,

            dailyOrders,

            weeklyOrders,

            monthlyOrders,

            yearlyOrders,

          };

        }
      );

      setChartData(formattedData);

      setRevenue({
        daily: dailyRevenue,
        weekly: weeklyRevenue,
        monthly: monthlyRevenue,
        yearly: yearlyRevenue,
      });

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    getProducts();

  }, []);

  // =========================
  // TOTAL COUNTS
  // =========================

  const totalProducts = products.length;

  const totalOrders = products.reduce(
    (sum, item) =>
      sum + (item.totalOrders || 0),
    0
  );

  const lowStock = products.filter(
    (item) => item.stock < 10
  ).length;

  return (
    <>
      <AdminHeader />

      <div className="min-h-screen bg-[#f7f1e8] p-6">

        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center text-[#6f7d31] mb-10">
          Analytics Dashboard
        </h1>

        {/* ========================= */}
        {/* TOP CARDS */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL PRODUCTS */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Total Products
            </h2>

            <h1 className="text-4xl font-bold text-[#6f7d31] mt-3">
              {totalProducts}
            </h1>

          </div>

          {/* TOTAL ORDERS */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Total Orders
            </h2>

            <h1 className="text-4xl font-bold text-blue-500 mt-3">
              {totalOrders}
            </h1>

          </div>

          {/* LOW STOCK */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Low Stock
            </h2>

            <h1 className="text-4xl font-bold text-red-500 mt-3">
              {lowStock}
            </h1>

          </div>

        </div>

        {/* ========================= */}
        {/* REVENUE CARDS */}
        {/* ========================= */}

        <h2 className="text-3xl font-bold text-[#4d2f1f] mb-6">
          Revenue Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* DAILY */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              One Day Revenue
            </h2>

            <h1 className="text-3xl font-bold text-green-600 mt-3">
              ₹ {revenue.daily}
            </h1>

          </div>

          {/* WEEKLY */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              One Week Revenue
            </h2>

            <h1 className="text-3xl font-bold text-blue-500 mt-3">
              ₹ {revenue.weekly}
            </h1>

          </div>

          {/* MONTHLY */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              One Month Revenue
            </h2>

            <h1 className="text-3xl font-bold text-orange-500 mt-3">
              ₹ {revenue.monthly}
            </h1>

          </div>

          {/* YEARLY */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500">
              One Year Revenue
            </h2>

            <h1 className="text-3xl font-bold text-purple-600 mt-3">
              ₹ {revenue.yearly}
            </h1>

          </div>

        </div>

        {/* ========================= */}
        {/* CHART */}
        {/* ========================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Product Orders Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={450}
          >

            <BarChart
              data={chartData}
              barGap={8}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#d6ccb5"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#4d2f1f",
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fill: "#4d2f1f",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#fff7ed",
                  borderRadius: "16px",
                  border:
                    "2px solid #6f7d31",
                }}
              />

              <Legend />

              {/* DAILY */}

              <Bar
                dataKey="dailyOrders"
                fill="#6f7d31"
                radius={[10, 10, 0, 0]}
                name="Daily Orders"
              />

              {/* WEEKLY */}

              <Bar
                dataKey="weeklyOrders"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
                name="Weekly Orders"
              />

              {/* MONTHLY */}

              <Bar
                dataKey="monthlyOrders"
                fill="#c68642"
                radius={[10, 10, 0, 0]}
                name="Monthly Orders"
              />

              {/* YEARLY */}

              <Bar
                dataKey="yearlyOrders"
                fill="#8b5e3c"
                radius={[10, 10, 0, 0]}
                name="Yearly Orders"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* ========================= */}
        {/* TABLE */}
        {/* ========================= */}

        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-6">
            Product Details
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-[#6f7d31] text-white">

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Daily
                </th>

                <th className="p-4 text-left">
                  Weekly
                </th>

                <th className="p-4 text-left">
                  Monthly
                </th>

                <th className="p-4 text-left">
                  Yearly
                </th>

                <th className="p-4 text-left">
                  Total Orders
                </th>

              </tr>

            </thead>

            <tbody>

              {chartData.map((item) => (

                <tr
                  key={item.name}
                  className="border-b"
                >

                  <td className="p-4">
                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.stock}
                  </td>

                  <td className="p-4">
                    {item.dailyOrders}
                  </td>

                  <td className="p-4">
                    {item.weeklyOrders}
                  </td>

                  <td className="p-4">
                    {item.monthlyOrders}
                  </td>

                  <td className="p-4">
                    {item.yearlyOrders}
                  </td>

                  <td className="p-4">
                    {item.totalOrders}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
};

export default Analytics;