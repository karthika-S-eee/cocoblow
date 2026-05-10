import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const DeleteProduct = () => {

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // GET PRODUCTS
  const getProducts = async () => {

    try {

      const res = await axios.get(
        "https://cocoblowbackend.onrender.com/api/products",
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
  const handleSelect = (name) => {

    const product = products.find(
      (item) => item.name === name
    );

    setSelectedProduct(product);
  };

  // DELETE PRODUCT
  const handleDelete = async () => {

    try {

      await axios.delete(
        `https://cocoblowbackend.onrender.com/api/products/delete/${selectedProduct._id}`,
        {
          withCredentials: true,
        }
      );

      alert("Product Deleted Successfully");

      setSelectedProduct(null);

      getProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (
<> <AdminHeader/>
    <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
          Delete Product
        </h1>

        {/* SEARCH PRODUCT */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Product Name
          </label>

          <input
            list="products"
            placeholder="Search Product..."
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) =>
              handleSelect(e.target.value)
            }
          />

          <datalist id="products">

            {products.map((product) => (

              <option
                key={product._id}
                value={product.name}
              />

            ))}

          </datalist>

        </div>

        {/* SHOW PRODUCT */}

        {selectedProduct && (

          <div className="space-y-5">

            {/* IMAGE */}

            <img
              src={`http://localhost:5000/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-2xl"
            />

            {/* DETAILS */}

            <div className="space-y-3">

              <div>

                <h2 className="font-semibold">
                  Product Name
                </h2>

                <p>{selectedProduct.name}</p>

              </div>

              <div>

                <h2 className="font-semibold">
                  Category
                </h2>

                <p>{selectedProduct.category}</p>

              </div>

              <div>

                <h2 className="font-semibold">
                  Price
                </h2>

                <p>₹ {selectedProduct.price}</p>

              </div>

              <div>

                <h2 className="font-semibold">
                  Stock
                </h2>

                <p>{selectedProduct.stock}</p>

              </div>

              <div>

                <h2 className="font-semibold">
                  Description
                </h2>

                <p>{selectedProduct.description}</p>

              </div>

            </div>

            {/* DELETE BUTTON */}

            <button
              onClick={handleDelete}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold"
            >
              Delete Product
            </button>

          </div>

        )}

      </div>
    </div>
    </>
  );
};

export default DeleteProduct;