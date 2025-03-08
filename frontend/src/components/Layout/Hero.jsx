import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row h-[400px] md:h-[500px] lg:h-[400px]">
      {/* Text and Button Half */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black bg-opacity-5 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="text-center text-black max-w-md md:max-w-lg lg:max-w-xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter uppercase mb-4">
            FIND CLOTHES THAT MATCHES YOUR
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base">
            Explore Now
          </button>
        </div>
      </div>
      {/* Image Half */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <img
          src={heroImg}
          alt="Fashionable clothes"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
