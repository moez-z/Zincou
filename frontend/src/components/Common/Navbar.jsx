import React, { useState, useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartDrawer from "../Layout/CartDrawer";
import Login from "../Layout/Login";
import { IoMdClose } from "react-icons/io";
import ProfileSection from "../Layout/ProfileSection";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { selectedCart } = useSelector((state) => state.cart);
  const isAdmin = isAuthenticated && user?.role === "admin";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNavDrawerOpen(false);
    setSearchOpen(false);
  }, [location]);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleLoginModal = () => setLoginModalOpen(!loginModalOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navigationItems = [
    { to: "/collections/all?gender=Men", label: "Men" },
    { to: "/collections/all?gender=Women", label: "Women" },
    { to: "/collections/sale", label: "On Sale" },
    { to: "/new-arrivals", label: "New Arrivals" },
  ];

  return (
    <>
      <nav
        className={`w-full flex items-center justify-between py-3 px-4 md:px-6 lg:px-8 xl:px-20 bg-white sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "shadow-md border-b border-gray-100 py-2"
            : "shadow-sm border-b border-transparent"
        }`}
      >
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleNavDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Open menu"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Left Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium uppercase tracking-wide relative group transition-colors duration-200"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors whitespace-nowrap"
          >
            ZinCou
          </Link>
        </div>
        {/* Right Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
          {/* Search - Desktop */}
          <div className="hidden sm:block relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-56 lg:w-64 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white border border-gray-200 transition-all duration-200"
              />
              <button className="absolute right-3 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <HiMagnifyingGlass className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Search - Mobile Toggle */}
          <button
            onClick={toggleSearch}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Search"
          >
            <HiMagnifyingGlass className="h-5 w-5 text-gray-700" />
          </button>

          {/* Admin Link */}
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden md:block bg-gray-900 px-3 py-1.5 rounded-md text-sm text-white hover:bg-gray-800 transition-all font-medium shadow-sm"
            >
              Admin
            </Link>
          )}

          {/* Profile */}
          <div className="hidden sm:block">
            <ProfileSection />
          </div>

          {/* Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all group"
            aria-label="Shopping cart"
          >
            <HiOutlineShoppingBag className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
            {selectedCart?.products?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-sm animate-bounce">
                {selectedCart.products.length}
              </span>
            )}
          </button>

          {/* Mobile Profile */}
          <div className="sm:hidden">
            <ProfileSection />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg p-4 md:hidden z-30 animate-slideDown">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white border border-gray-200"
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="absolute right-3 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoMdClose className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        )}
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
        className={`fixed top-0 left-0 w-full max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] z-50 backdrop-blur-lg ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
            <button
              onClick={toggleNavDrawer}
              className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
              aria-label="Close menu"
            >
              <IoMdClose className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-6 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={toggleNavDrawer}
                className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Footer */}
          {isAdmin && (
            <div className="p-6 border-t border-gray-100">
              <Link
                to="/admin"
                onClick={toggleNavDrawer}
                className="block w-full bg-gray-900 text-white text-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium shadow-sm"
              >
                Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {(navDrawerOpen || searchOpen) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => {
            setNavDrawerOpen(false);
            setSearchOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
