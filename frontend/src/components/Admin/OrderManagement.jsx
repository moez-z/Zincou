import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const { orders } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status, e) => {
    e.stopPropagation(); // Prevent row click
    console.log({ id: orderId });
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const handleCancelOrder = (orderId, e) => {
    e.stopPropagation(); // Prevent row click
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(updateOrderStatus({ id: orderId, status: "Cancelled" }));
    }
  };

  const handleRowClick = (orderId) => {
    console.log(orderId);
    navigate(`/admin/order/${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer ID</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user?._id || "N/A"}</td>
                  <td className="p-4">${order.totalPrice?.toFixed(2)}</td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      name="status"
                      id={`status-${order._id}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value, e)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) =>
                          handleStatusChange(order._id, "Delivered", e)
                        }
                        disabled={order.status === "Cancelled"}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Mark as Delivered
                      </button>
                      <button
                        onClick={(e) => handleCancelOrder(order._id, e)}
                        disabled={order.status === "Cancelled" || order.status === "Delivered"}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;