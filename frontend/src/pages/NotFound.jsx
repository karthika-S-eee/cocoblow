import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f1e8] to-[#dfe8b7] flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-[40px] p-10 max-w-2xl text-center border-4 border-[#6f7d31] relative overflow-hidden">

        {/* FLOATING COCONUTS */}
        <div className="absolute top-4 left-6 text-5xl animate-bounce">
          🥥
        </div>

        <div className="absolute bottom-4 right-6 text-5xl animate-pulse">
          🌴
        </div>

        {/* ERROR NUMBER */}
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-[#6f7d31] leading-none drop-shadow-lg">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-black text-[#3b2415] mt-4">
          Wrong Turn Buddy 🚧
        </h2>

        {/* FUN TEXT */}
        <p className="text-gray-600 text-lg mt-6 leading-8">
          Looks like you followed a coconut that rolled
          into the jungle 🌴🥥
        </p>

        <p className="text-gray-500 mt-2">
          The page you are searching for does not exist,
          got moved, or got kidnapped by monkeys 🐒
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">

          <Link
            to="/"
            className="bg-[#6f7d31] hover:bg-[#5c6829] text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            🏠 Take Me Home
          </Link>

          <Link
            to="/shop"
            className="bg-[#3b2415] hover:bg-[#2b1a10] text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            🛒 Continue Shopping
          </Link>

        </div>

        {/* EXTRA FUN */}
        <div className="mt-10 text-6xl animate-spin-slow">
          🥥
        </div>

      </div>

      {/* CUSTOM ANIMATION */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
        `}
      </style>

    </div>
  );
}

export default NotFound;