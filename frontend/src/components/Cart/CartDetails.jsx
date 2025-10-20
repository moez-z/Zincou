import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { createCheckoutSession } from "../../redux/slices/checkoutSlice";

const CartDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCart, loading, error } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const { loading: checkoutLoading } = useSelector((state) => state.checkout);

  const [promoCode, setPromoCode] = useState("");

  // Fetch cart when user or guestId is available
  useEffect(() => {
    if (user?._id || guestId) {
      dispatch(fetchCart({ userId: user?._id, guestId }));
    }
  }, [dispatch, user?._id, guestId]);

  if (loading || !selectedCart || !selectedCart.products) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading cart: {error}</div>;
  }

  if (selectedCart.products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Subtotal and totals
  const subtotal = selectedCart.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const discount = 0; // Promo code logic can be added
  const deliveryFee = 0;
  const total = subtotal - discount + deliveryFee;

  // Handle quantity change
  const handleQuantityChange = (index, action) => {
    const product = selectedCart.products[index];
    if (!product) return;

    const newQuantity =
      action === "increase"
        ? product.quantity + 1
        : Math.max(product.quantity - 1, 1);

    dispatch(
      updateCartItemQuantity({
        userId: user?._id,
        guestId,
        productId: product._id,
        quantity: newQuantity,
        size: product.size,
        color: product.color,
      })
    );
  };

  // Handle remove product
  const handleDeleteItem = (index) => {
    const product = selectedCart.products[index];
    if (!product) return;

    if (window.confirm(`Remove ${product.name} from cart?`)) {
      dispatch(
        removeFromCart({
          userId: user?._id,
          guestId,
          productId: product._id,
          size: product.size,
          color: product.color,
        })
      );
    }
  };

  const handleApplyPromo = () => {
    alert(`Applying promo code: ${promoCode}`);
  };

  // Handle checkout navigation (auto-create session if logged in)
  const handleContinueToCheckout = async () => {
    if (user?._id) {
      const checkoutData = {
        checkoutItems: selectedCart.products.map((p) => ({
          productId: p._id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          size: p.size,
          color: p.color,
          image: p.image,
        })),
        shippingAddress: {}, // Can prefill if you have saved addresses
        paymentMethod: "Payment on delivery",
        totalPrice: total,
      };
      await dispatch(createCheckoutSession(checkoutData));
    }
    navigate("/checkout");
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
            {selectedCart.products.map((product, index) => (
              <div
                className="flex flex-col sm:flex-row items-start justify-between py-4 border-b last:border-b-0"
                key={product._id || index}
              >
                <div className="flex flex-col sm:flex-row items-start w-full sm:w-auto mb-4 sm:mb-0">
                  <img
                    src={product.image}
                    alt={product.name || "Product image"}
                    loading="lazy"
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
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center text-base md:text-lg">
              <p>Discount</p>
              <p>-${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center text-base md:text-lg">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>

            {/* Promo Code */}
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
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <button
              onClick={handleContinueToCheckout}
              disabled={checkoutLoading}
              className="w-full bg-black text-white py-2 md:py-3 rounded-lg hover:bg-gray-800 transition duration-200 text-base md:text-lg"
            >
              {checkoutLoading ? "Processing..." : "Continue to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
