import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersDetails } from "../redux/slices/orderSlice";
import { motion } from "framer-motion";

const OrdersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrdersDetails(id));
  }, [dispatch, id]);

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

  if (!orders) {
    return <p className="text-center mt-8">No order details found</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto p-6 md:p-8 bg-white shadow-lg rounded-2xl mt-8"
    >
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            🧾 Order Details
          </h2>
          <p className="text-gray-500">
            Placed on {new Date(orders.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <span
            className={`${
              orders.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            } px-4 py-1.5 rounded-full text-sm font-medium`}
          >
            {orders.isPaid ? "Paid" : "Pending Payment"}
          </span>
          <span
            className={`${
              orders.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } px-4 py-1.5 rounded-full text-sm font-medium`}
          >
            {orders.isDelivered ? "Delivered" : "Not Delivered"}
          </span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            Payment Info
          </h4>
          <p className="text-gray-600">Method: {orders.paymentMethod}</p>
          <p className="text-gray-600">
            Status:{" "}
            <span
              className={`font-medium ${
                orders.isPaid ? "text-green-600" : "text-red-500"
              }`}
            >
              {orders.isPaid ? "Paid" : "Unpaid"}
            </span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            Shipping Info
          </h4>
          <p className="text-gray-600">
            Method: {orders.shippingMethod || "Standard"}
          </p>
          <p className="text-gray-600">
            Address:{" "}
            {`${orders.shippingAddress?.city || ""}, ${
              orders.shippingAddress?.country || ""
            }`}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            Order Summary
          </h4>
          <p className="text-gray-600">
            Total Items: {orders.orderItems?.length}
          </p>
          <p className="text-gray-600 font-medium text-lg mt-2">
            Total Price:{" "}
            <span className="text-gray-800">
              ${orders.totalPrice?.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h4 className="text-xl font-semibold mb-4 text-gray-700">Products</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-700">
            <thead className="bg-gray-100 text-sm uppercase text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.orderItems?.map((item) => (
                <tr
                  key={item.productId}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back to orders */}
      <div className="flex justify-end mt-8">
        <Link
          to="/my-orders"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition-colors shadow-md"
        >
          ← Back to My Orders
        </Link>
      </div>
    </motion.div>
  );
};

export default OrdersPage;
