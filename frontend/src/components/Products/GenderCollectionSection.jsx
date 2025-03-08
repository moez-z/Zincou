import React from "react";
import menCollection from "../../assets/mens-collection.webp";
import womenCollection from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-12 px-4 lg:px-0">
      {/* Heading with Integral CF Font */}
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Our Products</h2>
      </div>

      {/* Collections */}
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* Women's Collection */}
        <div className="relative flex-1 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={womenCollection}
            alt="women collection"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Women's Collection
            </h2>
            <Link
              to="/collection/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={menCollection}
            alt="men collection"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Men's Collection
            </h2>
            <Link
              to="/collection/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
