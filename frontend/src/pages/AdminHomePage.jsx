import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, DollarSign, Package, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalRevenue, orderSummary } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const { totalRevenue, paidOrdersCount, lastOrders, totalOrders } =
    useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalRevenue());
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderSummary());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg mr-4">
              <DollarSign size={24} className="text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Revenue
            </h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalRevenue}</p>
          <p className="text-green-500 text-sm mt-2">
            for a {paidOrdersCount} orders
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <ShoppingCart size={24} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Orders
            </h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
          <Link
            to="/admin/orders"
            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Manage Orders <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg mr-4">
              <Package size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Products
            </h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">200</p>
          <Link
            to="/admin/products"
            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Manage Products <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
          >
            View All <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lastOrders.length > 0 ? (
                lastOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">
                      {order.user.name}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
