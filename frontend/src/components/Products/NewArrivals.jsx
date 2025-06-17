import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      {/* Scrollable Content Container */}
      <div className="container mx-auto relative overflow-hidden">
        {/* Scroll Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center z-10">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-full border bg-white text-black hover:bg-gray-100 transition-colors shadow-lg ml-2"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-full border bg-white text-black hover:bg-gray-100 transition-colors shadow-lg mr-2"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide flex space-x-6 px-4"
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%] xl:min-w-[20%] relative flex-shrink-0"
            >
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
