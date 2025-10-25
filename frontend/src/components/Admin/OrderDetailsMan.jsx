import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrdersDetails } from "../../redux/slices/orderSlice";
import { fetchUserById } from "../../redux/slices/adminSlice";

const OrderDetailsMan = () => {
  const {
    orders: orderDetails,
    loading,
    error,
  } = useSelector((state) => state.order);
  const { selectedUser } = useSelector((state) => state.admin);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch order details when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchOrdersDetails(id));
    }
  }, [dispatch, id]);

  // Fetch user details only when we have a new user ID
  useEffect(() => {
    const userId = orderDetails?.user;

    if (userId && (!selectedUser || selectedUser._id !== userId)) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, orderDetails?.user, selectedUser?._id]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();
  };

  // Loading state
  if (loading) {
    return (
      <p className="text-center mt-10 text-emerald-700 font-medium">
        Loading order details...
      </p>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );
  }

  // No order found
  if (!orderDetails) {
    return <p className="text-center mt-10 text-gray-500">No order found.</p>;
  }

  const getStatusStyles = (status) => {
    const statusMap = {
      delivered: "bg-green-100 text-green-700",
      shipping: "bg-blue-100 text-blue-700",
      processing: "bg-yellow-100 text-yellow-700",
    };
    return statusMap[status] || "bg-red-100 text-red-700";
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-emerald-700 text-center mb-10">
        Order Details
      </h1>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between mb-10 border-b pb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Order ID:{" "}
            <span className="text-emerald-700">{orderDetails._id}</span>
          </h2>
          <p className="text-gray-500">
            Placed on: {new Date(orderDetails.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-emerald-700 font-medium">Estimated Delivery:</p>
          <p className="text-gray-700 font-semibold">
            {calculateEstimatedDelivery(orderDetails.createdAt)}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyles(
              orderDetails.status
            )}`}
          >
            {orderDetails.status?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-emerald-50 p-5 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-emerald-800 mb-3">
          Customer Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {selectedUser?.firstName || "N/A"} {selectedUser?.lastName || "N/A"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {selectedUser?.email || "N/A"}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {selectedUser?.numeroPhone || "N/A"}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Ordered Items
        </h3>
        <div className="divide-y">
          {orderDetails.orderItems?.length > 0 ? (
            orderDetails.orderItems.map((item, index) => (
              <div key={item._id || index} className="flex items-center py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border mr-5"
                />
                <div className="flex-1">
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-md font-semibold">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No items found</p>
          )}
        </div>
      </div>

      {/* Payment & Delivery Info */}
      <div className="grid md:grid-cols-2 gap-8 border-t pt-6">
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800">
            Payment Method
          </h4>
          <p className="text-gray-600">{orderDetails.paymentMethod || "N/A"}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800">
            Shipping Address
          </h4>
          <p className="text-gray-600">
            {orderDetails.shippingAddress?.address || "N/A"}
          </p>
          <p className="text-gray-600">
            {orderDetails.shippingAddress?.city
              ? `${orderDetails.shippingAddress.city}, ${
                  orderDetails.shippingAddress.country || ""
                }`
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="text-right mt-8">
        <h3 className="text-xl font-bold text-gray-800">
          Total:{" "}
          <span className="text-emerald-700">
            ${orderDetails.totalPrice?.toFixed(2) || "0.00"}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default OrderDetailsMan;
