import React, { useState } from "react";
import MyOrdersPage from "./MyOrdersPage";
import EditProfile from "./EditProfile"; // ✅ new component
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt, FaUserEdit, FaClipboardList } from "react-icons/fa";
import { logout, logoutUser } from "../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState(""); // ✅ new state

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  const confirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // clear session cookie
      dispatch(logout()); // clear redux
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-grow container mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            {/* Left Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-md rounded-xl p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{user.email}</p>

              {/* Tabs */}
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "edit"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FaUserEdit /> Edit Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "orders"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FaClipboardList /> My Orders
                </button>
              </div>

              {/* Logout */}
              <hr className="my-6 border-gray-200" />
              <button
                onClick={handleLogoutClick}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt className="inline-block mr-2" /> Logout
              </button>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-xl shadow-md p-6">
              {activeTab === "orders" ? <MyOrdersPage /> : <EditProfile />}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaSignOutAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to log out? You’ll need to log in again to
                access your account.
              </p>
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

export default Profile;
