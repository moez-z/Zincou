import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, logoutUser } from "../../redux/slices/authSlice";
import Login from "./Login";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";

const ProfileSection = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // calls backend to clear cookie
      dispatch(logout()); // clear Redux state
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {isAuthenticated && user ? (
        // Profile Bar - Displayed when user is logged in
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.firstName?.charAt(0).toUpperCase() ||
                user.email?.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-700 hidden md:block">
              {user.firstName || user.email?.split("@")[0]}
            </span>
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              ></div>

              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/profile");
                    }}
                  >
                    <FaUser className="text-gray-500" />
                    <span>My Profile</span>
                  </button>

                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/my-orders");
                    }}
                  >
                    <FaShoppingBag className="text-gray-500" />
                    <span>My Orders</span>
                  </button>

                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                    onClick={() => {
                      setShowDropdown(false);
                      // Navigate to wishlist
                    }}
                  >
                    <FaHeart className="text-gray-500" />
                    <span>Wishlist</span>
                  </button>

                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                    onClick={() => {
                      setShowDropdown(false);
                      // Navigate to settings
                    }}
                  >
                    <FaCog className="text-gray-500" />
                    <span>Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        // Login Button - Displayed when user is not logged in
        <button
          onClick={handleLoginClick}
          className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Login
        </button>
      )}

      {/* Login Modal */}
      {loginModalOpen && (
        <Login
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaSignOutAlt className="text-red-600 text-2xl" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Logout
              </h3>

              {/* Message */}
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to logout? You'll need to login again to
                access your account.
              </p>

              {/* Buttons */}
              <div className="flex gap-4 w-full">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
