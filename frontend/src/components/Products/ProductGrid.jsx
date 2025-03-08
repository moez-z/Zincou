import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="w-full h-96">
            <img
              src={product.images[0]}
              alt={product.images[0].altText || product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
