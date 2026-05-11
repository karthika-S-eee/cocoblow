import Header from '../components/Header'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="bg-[#f7f1e8] min-h-screen">

      <Header />

      {/* ABOUT CONTENT */}
      <section className="py-14 px-6 md:px-20">

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-14">

          {/* SIDE HEADING */}
          <div className="border-l-4 border-[#6f7d31] pl-4 mb-10">

            <h1 className="text-3xl md:text-5xl font-extrabold text-[#4d2f1f]">
              About Us
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Pure. Natural. Sustainable Coconut Living.
            </p>

          </div>

          {/* CONTENT */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">

            <p>
              Welcome to{" "}
              <span className="font-semibold text-[#6f7d31]">
                CocoBlom
              </span>,
              your trusted destination for pure, natural, and eco-friendly
              coconut-based products. We are dedicated to bringing you the
              finest quality products directly sourced from nature and
              delivered with care to your doorstep.
            </p>

            <p>
              At CocoBlom, we believe in promoting a sustainable lifestyle.
              Our range of products includes coconut oil, coir-based items,
              organic essentials, and eco-friendly alternatives designed to
              support both your health and the environment.
            </p>

            <p>
              We work closely with local farmers and producers to ensure
              authenticity, freshness, and quality in every product. Each
              item is carefully selected and processed to maintain its
              natural goodness without any harmful chemicals or additives.
            </p>

            <p>
              Our mission is simple — to make natural living easy,
              affordable, and accessible for everyone while supporting
              sustainable farming and reducing environmental impact.
            </p>

            <p>
              With a user-friendly shopping experience, secure payment
              options, and reliable delivery service, CocoBlom is committed
              to providing you with the best online shopping experience.
            </p>

          </div>

          {/* BUTTON */}
          <div className="mt-10">

            <Link
              to="/shop"
              className="inline-block bg-[#6f7d31] hover:bg-[#5d6928] transition text-white px-8 py-3 rounded-full font-semibold shadow-md"
            >
              Start Shopping
            </Link>

          </div>

        </div>
      </section>
    </div>
  )
}

export default About