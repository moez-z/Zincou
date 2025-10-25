import React, { useEffect, useState } from "react";
import {
  Trash2,
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Home,
  Phone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  fetchUsers,
  deleteUser,
  updateUser,
} from "../../redux/slices/adminSlice";
import { FaCheckCircle, FaSignOutAlt } from "react-icons/fa";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users = [], loading } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    numeroPhone: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // "delete" | "role"
  const [targetUserId, setTargetUserId] = useState(null);
  const [newRole, setNewRole] = useState(null);
  const [messageConfirm, setMessageConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await dispatch(addUser(formData));
    setSubmitting(false);

    if (addUser.fulfilled.match(result)) {
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        numeroPhone: "",
        email: "",
        password: "",
        role: "customer",
      });
      alert("✅ User added successfully!");
      dispatch(fetchUsers());
    } else {
      alert("❌ Failed to add user");
    }
  };

  // ✅ Handle role change
  const confirmRoleChange = (userId, newRole) => {
    setConfirmType("role");
    setTargetUserId(userId);
    setNewRole(newRole);
    setMessageConfirm("Are you sure you want to change this user’s role?");
    setShowConfirmModal(true);
  };

  // ✅ Handle delete flow
  const confirmDeleteUser = (userId) => {
    setConfirmType("delete");
    setTargetUserId(userId);
    setMessageConfirm("Are you sure you want to delete this user?");
    setShowConfirmModal(true);
  };

  const cancelConfirm = () => {
    setShowConfirmModal(false);
    setTargetUserId(null);
    setNewRole(null);
    setConfirmType(null);
  };

  const handleConfirm = async () => {
    if (!targetUserId) return;

    if (confirmType === "role") {
      await dispatch(updateUser({ id: targetUserId, role: newRole }));
      alert("✅ Role updated successfully!");
    } else if (confirmType === "delete") {
      await dispatch(deleteUser(targetUserId));
      alert("🗑️ User deleted successfully!");
    }

    dispatch(fetchUsers());
    cancelConfirm();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-500">Add and manage system users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New user */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <UserPlus size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Add New User</h3>
            </div>

            <form onSubmit={handleSubmit}>
              {[
                {
                  name: "firstName",
                  label: "First Name",
                  icon: User,
                  type: "text",
                },
                {
                  name: "lastName",
                  label: "Last Name",
                  icon: User,
                  type: "text",
                },
                { name: "email", label: "Email", icon: Mail, type: "email" },
                {
                  name: "numeroPhone",
                  label: "Phone Number",
                  icon: Phone,
                  type: "text",
                },
                { name: "address", label: "Address", icon: Home, type: "text" },
                {
                  name: "password",
                  label: "Password",
                  icon: Lock,
                  type: "password",
                },
              ].map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 font-medium mb-1"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <field.icon size={16} className="text-gray-400" />
                    </div>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Role select */}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck size={16} className="text-gray-400" />
                  </div>
                  <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full ${
                  submitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center`}
              >
                {submitting ? (
                  "Adding..."
                ) : (
                  <>
                    <UserPlus size={18} className="mr-2" />
                    Add User
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* User list management */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">User List</h3>
              <p className="text-gray-500 text-sm">
                {loading ? "Loading users..." : `${users.length} users found`}
              </p>
            </div>

            <div className="overflow-x-auto">
              {users.length === 0 && !loading ? (
                <p className="text-center py-6 text-gray-500">
                  No users available.
                </p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Full Name",
                        "Email",
                        "Phone",
                        "Address",
                        "Role",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="p-4 text-gray-700">{user.email}</td>
                        <td className="p-4 text-gray-700">
                          {user.numeroPhone}
                        </td>
                        <td className="p-4 text-gray-700">{user.address}</td>
                        <td className="p-4">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              confirmRoleChange(user._id, e.target.value)
                            }
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => confirmDeleteUser(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded flex items-center transition-colors"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirmation
              </h3>
              <p className="text-gray-600 text-center mb-6">{messageConfirm}</p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={cancelConfirm}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
