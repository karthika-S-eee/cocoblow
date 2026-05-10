import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const UserProfile = () => {

  const navigate = useNavigate();

  // GET USER DATA
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT
  const handleLogout = async () => {

    try {

      // OPTIONAL BACKEND LOGOUT
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // CLEAR LOCAL STORAGE
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      alert("Logout Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Logout Failed");

    }

  };

  return (
    <>
      <Header />

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
  {user?.name?.charAt(0)}
</div>

          {/* TITLE */}

          <h1 className="text-3xl font-bold text-center text-[#6f7d31] mb-8">
            User Profile
          </h1>

          {/* USER DETAILS */}

          <div className="space-y-5">

            {/* NAME */}

            <div>

              <label className="block font-semibold mb-2">
                Name
              </label>

              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="text"
                value={user?.email || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

            {/* PHONE */}

            <div>

              <label className="block font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                value={user?.phoneNumber || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

            {/* ADDRESS */}

            <div>

              <label className="block font-semibold mb-2">
                Address
              </label>

              <textarea
                value={user?.address || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                rows="3"
              />

            </div>

            {/* ROLE */}

            <div>

              <label className="block font-semibold mb-2">
                Role
              </label>

              <input
                type="text"
                value={user?.role || ""}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

          </div>

          {/* LOGOUT BUTTON */}

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
};

export default UserProfile;