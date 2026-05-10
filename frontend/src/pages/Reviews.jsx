import { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const Reviews = ({ product }) => {

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const submitRating = async () => {

    try {

      await axios.post(
        `https://cocoblowbackend.onrender.com/api/products/rating/${product._id}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Rating Added");


    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="mt-6 border rounded-2xl p-5">

      <h2 className="text-xl font-bold mb-4">
        Product Rating
      </h2>

      {/* STARS */}

      <div className="flex gap-2 mb-4">

        {[1, 2, 3, 4, 5].map((star) => (

          <Star
            key={star}
            size={30}
            onClick={() => setRating(star)}
            className={
              star <= rating? "fill-yellow-400 text-yellow-400 cursor-pointer"
                : "text-gray-400 cursor-pointer"
            }
          />

        ))}

      </div>

      {/* COMMENT */}

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Write review..."
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={submitRating}
        className="mt-4 bg-[#6f7d31] text-white px-5 py-2 rounded-xl"
      >
        Submit Rating
      </button>

    </div>
  );
};
export default Reviews;