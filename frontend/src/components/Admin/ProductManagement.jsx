import React, { useState } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Removed category attribute from product data
  const products = [
    {
      _id: 123,
      name: "Premium Leather Wallet",
      price: "$87.99",
      sku: "LTHR-585",
    },
    {
      _id: 1234,
      name: "Wireless Headphones",
      price: "$129.99",
      sku: "AUDIO-127",
    },
    {
      _id: 1235,
      name: "Organic Cotton T-Shirt",
      price: "$34.50",
      sku: "APRL-342",
    },
    {
      _id: 1236,
      name: "Stainless Steel Water Bottle",
      price: "$27.99",
      sku: "HYDRO-186",
    },
  ];

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with id", productId);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Product Management
          </h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>Sort by: Name</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-700">{product.price}</td>
                    <td className="p-4 text-gray-700">{product.sku}</td>
                    <td className="p-4 flex gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded flex items-center transition-colors"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded flex items-center transition-colors"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  &laquo;
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  &raquo;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
