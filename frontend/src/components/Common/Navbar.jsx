import React, { useState } from "react";
import {
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import CartDrawer from "../Layout/CartDrawer";
import Login from "../Layout/Login";
import ProfileSection from "../Layout/ProfileSection";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { selectedCart } = useSelector((state) => state.cart);
  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-3 md:py-4">
          {/* Hamburger Menu (mobile/tablet only) */}
          <button
            onClick={() => setNavDrawerOpen(true)}
            className="block md:hidden text-gray-700"
          >
            <HiBars3BottomRight className="h-6 w-6" />
          </button>

          {/* Left Navigation (desktop) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["Men", "Women", "On Sale", "New Arrivals"].map((item) => (
              <Link
                key={item}
                to={`/collections/all?gender=${
                  item === "Men" || item === "Women" ? item : ""
                }`}
                className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center md:flex-none">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide"
            >
              ZinCou
            </Link>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search (hidden on small tablets) */}
            <div className="hidden md:flex relative items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-32 sm:w-40 md:w-48 lg:w-60 px-3 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all"
              />
              <button className="absolute right-3">
                <HiMagnifyingGlass className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Admin Link (visible only on large screens) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden lg:block bg-black px-3 py-1.5 rounded text-sm text-white hover:bg-gray-800 transition-all"
              >
                Admin
              </Link>
            )}

            {/* Profile */}
            <ProfileSection />

            {/* Cart Icon */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative hover:text-black transition-colors"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              {selectedCart?.products?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {selectedCart.products.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Navigation Drawer ===== */}
      <AnimatePresence>
        {navDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavDrawerOpen(false)}
            />

            {/* Slide-in Drawer */}
            <motion.div
              className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setNavDrawerOpen(false)}>
                  <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="p-4 flex flex-col space-y-5">
                {["Men", "Women", "On Sale", "New Arrivals"].map((item) => (
                  <Link
                    key={item}
                    to={`/collections/all?gender=${
                      item === "Men" || item === "Women" ? item : ""
                    }`}
                    onClick={() => setNavDrawerOpen(false)}
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    {item}
                  </Link>
                ))}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setNavDrawerOpen(false)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-center font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== Cart Drawer ===== */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(false)}
      />

      {/* ===== Login Modal ===== */}
      {loginModalOpen && (
        <Login
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}
    </>
  );
};

export default Navbar;
