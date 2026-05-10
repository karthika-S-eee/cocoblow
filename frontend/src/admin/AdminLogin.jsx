import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "https://cocoblowbackend.onrender.com/api/admin/login",
        form,
        {
    withCredentials: true,
  }
      );
      // STORE ADMIN DETAILS
    localStorage.setItem(
      "admin",
      JSON.stringify(res.data.admin)
    );
      alert("Admin Login Successful");

        navigate("/admin/dashboard");
      
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#6f7d31] text-center py-8 px-6">
          <h1 className="text-4xl font-extrabold text-white">
            CocoBlow
          </h1>
          <p className="text-white/80 mt-2">
            Admin Login
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-[#4d2f1f] font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6f7d31]"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 text-[#4d2f1f] font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6f7d31]"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6f7d31] hover:bg-[#5d6928] transition text-white font-bold py-3 rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;