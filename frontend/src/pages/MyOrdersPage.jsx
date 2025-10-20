import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-4 sm:px-6">Image</th>
              <th className="py-3 px-4 sm:px-6">Order ID</th>
              <th className="py-3 px-4 sm:px-6">Created</th>
              <th className="py-3 px-4 sm:px-6">Shipping Address</th>
              <th className="py-3 px-4 sm:px-6">Items</th>
              <th className="py-3 px-4 sm:px-6">Price</th>
              <th className="py-3 px-4 sm:px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-4 px-4 sm:px-6">
                    <img
                      src={order.orderitems[0]?.image}
                      alt={order.orderitems[0]?.name}
                      className="w-10 h-10 sm:w-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    {order.orderitems.length}
                  </td>
                  <td className="py-4 px-4 sm:px-6">${order.totalPrice}</td>
                  <td className="py-4 px-4 sm:px-6">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 sm:px-6 text-center">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
