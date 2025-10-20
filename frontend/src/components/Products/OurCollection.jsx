import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OurCollections = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?limit=8`
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleViewAll = () => {
    navigate("/collections/all"); // ✅ Navigate to all collections
  };

  return (
    <section className="w-full md:w-3/4 py-12 bg-blanc-1 dark:bg-gray-900 mx-auto md:ml-auto lg:ml-60 rounded-xl my-8 px-4">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
          Our Collections
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
          Explore our diverse collections tailored for every occasion.
        </p>
      </div>

      {/* Collection Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={collection.images[0]?.url || "/placeholder.png"}
                alt={collection.name}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider text-center p-3 md:p-4 bg-black bg-opacity-50 rounded-lg">
                  {collection.name}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full py-2 bg-white text-black font-medium rounded hover:bg-gray-100 transition-colors">
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
          >
            View All Collections
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurCollections;
