
import axios from "axios";
import { useState } from "react";
import AdminHeader from "./AdminHeader";

const AddProduct = () => {

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (loading) return;
     setLoading(true);
    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      formData.append("image", image);

      // TOKEN FROM LOCAL STORAGE
      const token = localStorage.getItem("token");
      console.log(token);
      // API CALL
      const res = await axios.post(
        "https://cocoblowbackend.onrender.com/api/products/add",
        formData,{
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(res.data);

      alert("Product Added Successfully");

      // RESET FORM
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });

      setImage(null);

    } catch (error) {

      console.log(error);

      alert(
      error.response?.data?.message || "Failed to Add Product"
    );
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <><AdminHeader/>
    <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#6f7d31] py-8 px-6 text-center">

          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Add Coconut Product
          </h1>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-10 space-y-6"
        >

          {/* PRODUCT NAME */}
          <div>

            <label className="block font-semibold mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={form.name}
              placeholder="Enter product name"
              className="w-full border rounded-xl px-4 py-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

          </div>

          {/* CATEGORY */}
          <div>

            <label className="block font-semibold mb-2">
              Category
            </label>

            <input
              type="text"
              value={form.category}
              placeholder="Enter category"
              className="w-full border rounded-xl px-4 py-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            />

          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PRICE */}
            <div>

              <label className="block font-semibold mb-2">
                Price
              </label>

              <input
                type="number"
                value={form.price}
                placeholder="Enter price"
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
              />

            </div>

            {/* STOCK */}
            <div>

              <label className="block font-semibold mb-2">
                Stock
              </label>

              <input
                type="number"
                value={form.stock}
                placeholder="Enter stock"
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  setForm({
                    ...form,
                    stock: e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              rows="5"
              value={form.description}
              placeholder="Write description"
              className="w-full border rounded-xl px-4 py-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

          </div>

          {/* IMAGE */}
          <div>

            <label className="block font-semibold mb-2">
              Upload Image
            </label>

            <input
              type="file"
              className="w-full border rounded-xl p-3"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#6f7d31] text-white py-3 rounded-xl font-bold hover:bg-[#556220]"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
    </>
  );
};

export default AddProduct;