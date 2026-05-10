import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

import coconutImg from '../assets/products/coconut&copara.png'
import oilImg from '../assets/products/oil.png'
import coirBlockImg from '../assets/products/coirblock.png'
import chipsBlockImg from '../assets/products/coirshipblock.png'
import scrubberImg from '../assets/products/coirscrubber.png'
import toothbrushImg from '../assets/products/EcoToothbrush.png'

import slide1 from '../assets/banners/b1.png'
import slide2 from '../assets/banners/b2.png'
import slide3 from '../assets/banners/b3.png'
import Footer from '../components/Footer'

const slides = [
  {
    title: "PURE & NATURAL COCONUT PRODUCTS",
    subtitle: "Fresh from the Tropics to Your Doorstep",
    image: slide1
  },
  {
    title: "100% ORGANIC & SUSTAINABLE",
    subtitle: "Healthy & Eco-Friendly Coconut Living",
    image: slide2
  },
  {
    title: "NATURAL WELLNESS ESSENTIALS",
    subtitle: "Vibe natural. Choose CocoBlow.",
    image: slide3
  }
]

const products = [
  { name: "Coconut & Copra", img: coconutImg },
  { name: "Edible Coconut Oil", img: oilImg },
  { name: "Coir Block", img: coirBlockImg },
  { name: "Coir Chips Block", img: chipsBlockImg },
  { name: "Coir Scrubber", img: scrubberImg },
  { name: "Eco Toothbrush & Water Bottle", img: toothbrushImg }
]

const Home = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (i) => setIndex(i)

  return (
    <div>
      <Header />

      {/* HERO SLIDER */}
      <div
        className="w-full h-[80vh] bg-cover bg-center flex items-center justify-center transition-all duration-700"
        style={{ backgroundImage: `url(${slides[index].image})` }}
      >
        <div className="bg-black/40 w-full h-full flex flex-col items-center justify-center text-center px-4">

          <h1 className="text-white text-3xl md:text-5xl font-extrabold max-w-4xl">
            {slides[index].title}
          </h1>

          <p className="text-white mt-4 text-lg md:text-xl">
            {slides[index].subtitle}
          </p>

          <Link
            to="/shop"
            className="mt-6 bg-[#6f7d31] text-white px-6 py-3 rounded-full font-semibold"
          >
            Shop Now
          </Link>

          {/* DOTS */}
          <div className="flex gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="py-12 px-4 md:px-16 bg-[#f7f1e8]">

        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#4d2f1f] mb-10">
          Coconut Products
        </h2>

        {/* ROW 1 - 4 PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">

          {products.slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition
              h-[220px] md:h-[300px]"
            >
              <img
                src={item.img}
                className="h-[140px] md:h-[200px] w-full object-cover"
              />
              <div className="p-2 md:p-4 text-center font-semibold text-[#4d2f1f] text-sm md:text-base">
                {item.name}
              </div>
            </div>
          ))}

        </div>

        {/* ROW 2 - 2 PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

          {products.slice(4, 6).map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition
              h-[250px] md:h-[350px]"
            >
              <img
                src={item.img}
                className="h-[160px] md:h-[240px] w-full object-cover"
              />
              <div className="p-3 md:p-5 text-center font-semibold text-[#4d2f1f]">
                {item.name}
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* BOTTOM SECTION */}
      <section className="bg-white py-14 text-center px-4">

        <h2 className="text-2xl md:text-3xl font-bold text-[#6f7d31]">
          100% ORGANIC & SUSTAINABLE
        </h2>

        <p className="mt-2 text-gray-600">
          Healthy & Eco-Friendly Coconut Products
        </p>

        <Link
          to="/shop"
          className="inline-block mt-6 bg-[#6f7d31] text-white px-6 py-3 rounded-full"
        >
          Browse Products
        </Link>
      </section>
{/* <Footer/> */}
    </div>
  )
}

export default Home