import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const [cart, setCart] = useState({
    products: [
      {
        name: "Gradient Graphic T-shirt",
        price: 145,
        images: "https://picsum.photos/200?random=1",
        size: "Large",
        color: "White",
        quantity: 1,
      },
      {
        name: "Checkered Shirt",
        price: 180,
        images: "https://picsum.photos/200?random=2",
        size: "Medium",
        color: "Red",
        quantity: 1,
      },
      {
        name: "Skinny Fit Jeans",
        price: 240,
        images: "https://picsum.photos/200?random=3",
        size: "Large",
        color: "Blue",
        quantity: 1,
      },
    ],
    subtotal: 565,
    discount: 113,
    deliveryFee: 15,
    total: 467,
  });

  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const handleApplyPromo = () => {
    // Add logic to apply promo code
    alert(`Applying promo code: ${promoCode}`);
  };

  const handleQuantityChange = (index, action) => {
    const updatedProducts = [...cart.products];
    if (action === "increase") {
      updatedProducts[index].quantity += 1;
    } else if (action === "decrease" && updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
    }
    setCart({ ...cart, products: updatedProducts });
  };

  const handleDeleteItem = (index) => {
    const updatedProducts = cart.products.filter((_, i) => i !== index);
    setCart({ ...cart, products: updatedProducts });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-10 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left side - Order Details */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-4 md:mb-6">
            Order Details
          </h2>
          <div className="space-y-4 md:space-y-6">
            {cart.products.map((product, index) => (
              <div
                className="flex flex-col sm:flex-row items-start justify-between py-4 border-b last:border-b-0"
                key={index}
              >
                <div className="flex flex-col sm:flex-row items-start w-full sm:w-auto mb-4 sm:mb-0">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full sm:w-24 md:w-32 h-auto sm:h-32 md:h-40 object-cover mb-3 sm:mb-0 sm:mr-4 md:mr-6 rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg md:text-xl font-medium mb-1 md:mb-2">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg">
                      Size: {product.size}
                    </p>
                    <p className="text-gray-600 text-base md:text-lg">
                      Color: {product.color}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(index, "decrease")}
                        className="bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg">{product.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, "increase")}
                        className="bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full sm:w-auto sm:flex-col sm:items-end">
                  <p className="text-lg md:text-xl font-medium">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-500 hover:text-red-700 ml-auto sm:ml-0 sm:mt-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-lg md:text-xl font-medium mb-4">Order Summary</h3>
          <div className="border-t py-4 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center text-base md:text-lg">
              <p>Subtotal</p>
              <p>${cart.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center text-base md:text-lg">
              <p>Discount (-20%)</p>
              <p>-${cart.discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center text-base md:text-lg">
              <p>Delivery Fee</p>
              <p>${cart.deliveryFee.toFixed(2)}</p>
            </div>
            {/* Promo Code Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-base md:text-lg gap-2 sm:gap-0">
              <p className="mb-1 sm:mb-0">Promo Code</p>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-auto"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-black text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-xl md:text-2xl font-bold mt-4 border-t pt-4">
              <p>Total</p>
              <p>${cart.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-2 md:py-3 rounded-lg hover:bg-gray-800 transition duration-200 text-base md:text-lg"
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
