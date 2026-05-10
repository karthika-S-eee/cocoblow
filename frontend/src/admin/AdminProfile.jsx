import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminProfile = () => {

  const navigate = useNavigate();

  // ADMIN DETAILS
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  // LOGOUT
  const handleLogout = async () => {

    try {

      await axios.post(
        "https://cocoblowbackend.onrender.com/api/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // REMOVE ADMIN DATA
      localStorage.removeItem("admin");

      alert("Logout Successful");

      navigate("/admin/login");

    } catch (error) {

      console.log(error);

      alert("Logout Failed");

    }

  };

  return (
    <>
      <AdminHeader />

      <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center p-6">

        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

          {/* PROFILE IMAGE */}

          <div
  className="
    w-32 h-32
    rounded-full
    border-4 border-[#6f7d31]
    bg-[#6f7d31]
    text-white
    flex items-center justify-center
    text-5xl font-bold
    uppercase
    mx-auto
  "
>
  {admin?.name?.charAt(0)}
</div>

          {/* TITLE */}

          <h1 className="text-3xl font-bold text-center text-[#6f7d31] mb-8">
            Welcome Admin
          </h1>

          {/* DETAILS */}

          <div className="space-y-5">

            {/* EMAIL */}

            <div>

              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="text"
                value={admin?.email || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

            {/* ROLE */}

            <div>

              <label className="block font-semibold mb-2">
                Role
              </label>

              <input
                type="text"
                value={admin?.role || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
};

export default AdminProfile;