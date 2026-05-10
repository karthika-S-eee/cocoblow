import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

function Ratings() {

  const [products, setProducts] =
    useState([]);

  // FETCH PRODUCTS

  const getProducts = async () => {

    try {

      const res = await axios.get(
        "https://cocoblowbackend.onrender.com/api/products"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    getProducts();

  }, []);

  return (

    <div className="min-h-screen bg-[#f7f1e8]">

      <AdminHeader />

      <div className="p-6">

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

          <h2 className="text-3xl font-bold mb-8 text-[#6f7d31]">
            Product Reviews
          </h2>

          {products.length === 0 && (

            <p className="text-gray-500">
              No Products Found
            </p>

          )}

          {products.map((product) => (

            <div
              key={product._id}
              className="mb-8 border-b pb-6"
            >

              {/* PRODUCT NAME */}

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-2xl font-bold text-[#6f7d31]">

                  {product.name}

                </h3>

                {/* AVERAGE RATING */}

                <div className="text-yellow-500 font-bold text-lg">

                  ⭐ {product.averageRating?.toFixed(1) || 0}

                </div>

              </div>

              {/* NO REVIEWS */}

              {product.ratings?.length === 0 && (

                <p className="text-gray-500">
                  No Reviews Yet
                </p>

              )}

              {/* REVIEWS */}

              {product.ratings?.map((item) => (

                <div
                  key={item._id}
                  className="
                    border rounded-2xl
                    p-4 mb-4
                    bg-[#f9f6f1]
                  "
                >

                  <div className="flex items-center justify-between mb-2">

                    <h4 className="font-bold text-lg">

                      {item.userName}

                    </h4>

                    <p className="text-yellow-500 font-bold">

                      {"★".repeat(item.rating)}

                    </p>

                  </div>

                  <p className="text-gray-700">

                    {item.comment}

                  </p>

                </div>

              ))}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Ratings;