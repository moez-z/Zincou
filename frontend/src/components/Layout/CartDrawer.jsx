import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("userToken");

  const handleCheckout = () => {
    toggleCartDrawer();

    if (!user && !token) {
      navigate("/login", { state: { from: "/my-cart" } });
    } else {
      navigate("/my-cart");
    }
  };

  if (!drawerOpen) return null; // avoid rendering when closed

  return (
    <>
      {/* Backdrop (click outside to close) */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={toggleCartDrawer}
      ></div>

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleCartDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <CartContents />
        </div>

        {/* Checkout Button */}
        <div className="p-4 bg-white sticky bottom-0 border-t">
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
