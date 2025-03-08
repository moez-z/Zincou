import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/fphotp.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container text-gray-900 mx-auto flex flex-col-reverse lg:flex-row items-center bg-gradient-to-br from-[#c91e1e] to-[#000303] h-screen rounded-3xl overflow-hidden">
        {/* Left Section */}
        <div className="lg:w-1/2 p-8 lg:p-16 text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter uppercase mb-4">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 h-96 lg:h-auto">
          <img
            src={featured}
            alt="A collection of stylish and comfortable apparel for everyday wear"
            className="w-full h-full  rounded-3xl lg:rounded-tr-3xl lg:rounded-br-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
