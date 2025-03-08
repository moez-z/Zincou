import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOption from "./SortOption";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "Product 1",
            },
          ],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "Product 2",
            },
          ],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=3",
              altText: "Product 3",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=4",
              altText: "Product 4",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center mb-4"
        aria-label="Open filters"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transform duration-300 lg:translate-x-0 lg:static lg:w-1/4`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      {/*sort option */}
      <SortOption />
    </div>
  );
};

export default CollectionPage;
