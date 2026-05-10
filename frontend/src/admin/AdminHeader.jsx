import { Link } from "react-router-dom";

import {
  PackagePlus,
  Trash2,
  Pencil,
  User,
  BarChart3,
} from "lucide-react";

const AdminHeader = () => {
  return (
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

          <Link
            to="/admin/ratings"
            className="flex items-center gap-2 bg-white text-[#6f7d31] px-4 py-2 rounded-xl font-semibold"
          >
            <User size={18} />
            Rating
          </Link>

        </div>

      </div>

    </div>
  );
};

export default AdminHeader;