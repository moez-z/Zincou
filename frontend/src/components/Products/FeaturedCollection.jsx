import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/fphotp.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 px-4 md:px-8 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between bg-gradient-to-br from-[#c91e1e] to-[#000303] rounded-3xl overflow-hidden">
        
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-12 lg:p-16 text-left text-white">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tighter uppercase mb-4">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-gray-200">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-white">
          <img
            src={featured}
            alt="A collection of stylish and comfortable apparel for everyday wear"
            className="w-full h-full object-contain rounded-t-3xl lg:rounded-tr-3xl lg:rounded-br-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
