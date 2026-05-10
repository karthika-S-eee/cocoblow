import { useEffect, useState } from "react";
import axios from "axios";
import AddHeader from "./AdminHeader";

const UpdateProduct = () => {

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // GET PRODUCTS
  const getProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products",
         {
        withCredentials: true
      }
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

  const fetchProducts = async () => {
    await getProducts();
  };

  fetchProducts();

}, []);


  // SELECT PRODUCT
  const handleSelect = (id) => {

    const product = products.find(
      (item) => item._id === id
    );

    setSelectedProduct(product);
  };

  // HANDLE CHANGE
  const handleChange = (field, value) => {

    setSelectedProduct({
      ...selectedProduct,
      [field]: value,
    });
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {

  try {

    const updatedData = {
      name: selectedProduct.name,
      category: selectedProduct.category,
      price: selectedProduct.price,
      stock: selectedProduct.stock,
      description: selectedProduct.description,
    };

    await axios.put(
      `http://localhost:5000/api/products/update/${selectedProduct._id}`,
      updatedData,
       {
        withCredentials: true,
        // headers: {
        //    "Content-Type": "application/json",
        // },
      }
    );

    alert("Product Updated Successfully");

  } catch (error) {
    console.log(error);
  }
};

  return (
<><AddHeader />
    <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center text-[#6f7d31] mb-8">
          Update Product
        </h1>

        {/* SELECT PRODUCT */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Select Product
          </label>

          <select
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) =>
              handleSelect(e.target.value)
            }
          >

            <option value="">
              Choose Product
            </option>

            {products.map((product) => (

              <option
                key={product._id}
                value={product._id}
              >
                {product.name}
              </option>

            ))}

          </select>

        </div>

        {/* SHOW SELECTED PRODUCT */}

        {selectedProduct && (

          <div className="space-y-5">

            {/* IMAGE */}

            <img
              src={`http://localhost:5000/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-2xl"
            />

            {/* NAME */}

            <div>

              <label className="block mb-2 font-semibold">
                Product Name
              </label>

              <input
                type="text"
                value={selectedProduct.name}
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="block mb-2 font-semibold">
                Category
              </label>

              <input
                type="text"
                value={selectedProduct.category}
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  handleChange(
                    "category",
                    e.target.value
                  )
                }
              />

            </div>

            {/* PRICE */}

            <div>

              <label className="block mb-2 font-semibold">
                Price
              </label>

              <input
                type="number"
                value={selectedProduct.price}
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  handleChange(
                    "price",
                    e.target.value
                  )
                }
              />

            </div>

            {/* STOCK */}

            <div>

              <label className="block mb-2 font-semibold">
                Stock
              </label>

              <input
                type="number"
                value={selectedProduct.stock}
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  handleChange(
                    "stock",
                    e.target.value
                  )
                }
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                rows="4"
                value={selectedProduct.description}
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value
                  )
                }
              />

            </div>

            {/* UPDATE BUTTON */}

            <button
              onClick={handleUpdate}
              className="w-full bg-[#6f7d31] text-white py-3 rounded-xl font-bold"
            >
              Update Product
            </button>

          </div>

        )}

      </div>
    </div>
    </>
  );
};

export default UpdateProduct;