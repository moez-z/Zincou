import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../redux/slices/cartSlice";
import { createCheckoutSession } from "../../redux/slices/checkoutSlice";
import { finalizeCheckout } from "../../redux/slices/checkoutSlice"; // <-- add this thunk

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCart } = useSelector((state) => state.cart);
  const { loading: checkoutLoading, error: checkoutError } = useSelector(
    (state) => state.checkout
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (user?._id || guestId) {
      dispatch(fetchCart({ userId: user?._id, guestId }));
    }
  }, [dispatch, user, guestId]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (!selectedCart?.products || selectedCart.products.length === 0) {
      alert("Cart is empty");
      return;
    }

    const checkoutData = {
      checkoutItems: selectedCart.products.map((product) => ({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        color: product.color,
        image: product.image,
      })),
      shippingAddress,
      paymentMethod: "Payment on delivery",
      totalPrice: selectedCart.totalPrice,
    };

    try {
      // 1️⃣ Create checkout
      const resultAction = await dispatch(createCheckoutSession(checkoutData));

      if (createCheckoutSession.fulfilled.match(resultAction)) {
        const newCheckout = resultAction.payload;

        // 2️⃣ Finalize checkout → create the order
        const finalizeAction = await dispatch(
          finalizeCheckout(newCheckout._id)
        );

        // Check if finalize was successful
        if (finalizeCheckout.fulfilled.match(finalizeAction)) {
          const order = finalizeAction.payload;

          if (order && order._id) {
            navigate(`/order-confirmation/${order._id}`);
          } else {
            alert("Order was created but no ID was returned");
          }
        } else {
          console.error(
            "Finalize error:",
            finalizeAction.payload || finalizeAction.error
          );
          alert("Failed to finalize order");
        }
      } else {
        alert("Failed to create checkout");
      }
    } catch (error) {
      console.error("Checkout creation error:", error);
      alert("Error creating checkout");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx:auto py-10 px-6 tracking-tighter">
      {/* right side */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4"> Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {selectedCart?.products?.length > 0 ? (
            selectedCart.products.map((product, index) => (
              <div
                className="flex items-start justify-between py-2 border-b"
                key={index}
              >
                <div className="flex items-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-md">{product.name}</h3>
                    <p className="text-gray-500">Size: {product.size}</p>
                    <p className="text-gray-500">Color: {product.color}</p>
                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-xl">
                  ${product.price?.toLocaleString() ?? 0}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${selectedCart?.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${selectedCart?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>

      {/* left side */}
      <div className="bg-white rounded-lg">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded"
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
