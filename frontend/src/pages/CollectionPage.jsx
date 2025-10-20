import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOption from "./SortOption";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);

        // Get params from URL
        const params = Object.fromEntries([...searchParams]);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          { params }
        );

        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };

    fetchCollections();
  }, [searchParams]); // 🔹 re-fetch when filters change

  const handleProductView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between p-4 lg:hidden sticky top-0 bg-white z-40 shadow-sm">
        <h2 className="text-xl font-semibold">All Collections</h2>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-1/4`}
      >
        <div className="p-4 border-b flex justify-between items-center lg:hidden">
          <h3 className="font-semibold">Filters</h3>
          <button onClick={toggleSidebar} className="text-gray-500 text-sm">
            Close
          </button>
        </div>
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold uppercase">All Products</h2>
          <SortOption />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 animate-pulse">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-10">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            No products available.
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden"
              >
                <img
                  src={product.images[0]?.url || "/placeholder.png"}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mt-1 mb-2 line-clamp-2 text-sm">
                    {product.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold text-gray-800">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleProductView(product._id)}
                      className="bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
