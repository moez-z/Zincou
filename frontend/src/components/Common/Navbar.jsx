import React, { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import CartDrawer from "../Layout/CartDrawer";
import Login from "../Layout/Login";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between py-4 px-20 bg-blanc-1">
        {/* Left Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            On Sale
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            New Arrivals
          </Link>
        </div>

        {/* Center logo*/}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-2xl font-medium">
            ZinCou
          </Link>
        </div>

        {/* Search and Right Icons Container */}
        <div className="flex items-center space-x-4">
          {/*search*/}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white"
            />
            <button className="absolute right-3">
              <HiMagnifyingGlass className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/*Right icons */}
          <Link
            to="/admin"
            className="block bg-black px-2 rounded text-sm text-white"
          >
            Admin
          </Link>
          <button onClick={toggleLoginModal} className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          <button onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Login Modal */}
      {loginModalOpen && (
        <Login
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}

      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 w-3/4 left-0 sm:w-1/2 md:w1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 " />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4"> Menu</h2>
          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              On Sale
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              New Arrivals
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
