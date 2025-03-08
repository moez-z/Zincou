import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      name: "zincou1",
      price: 10,
      description: "",
      category: "t-shirt",
      images: "https://picsum.photos/200?random=1",
      sizes: "M",
      colors: ["BLue"],
      quantity: 2,
    },
    {
      name: "zincou2",
      price: 10,
      description: "",
      category: "t-shirt",
      images: "https://picsum.photos/200?random=2",
      sizes: "M",
      colors: ["Red"],
      quantity: 2,
    },
    {
      name: "zincou3",
      price: 10,
      description: "",
      category: "t-shirt",
      images: "https://picsum.photos/200?random=3",
      sizes: "M",
      colors: ["green"],
      quantity: 2,
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.images}
              alt={product.name}
              className="w-20 h-20 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size : {product.sizes} | color : {product.colors}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
