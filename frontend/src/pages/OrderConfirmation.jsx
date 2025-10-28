import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrdersDetails } from "../redux/slices/orderSlice";

const OrderConfirmation = () => {
  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrdersDetails(id));
    }
  }, [dispatch, id]);

  const calculatedEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!orderDetails)
    return <p className="text-center mt-10">No order found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      <div className="p-6 rounded-lg border">
        <div className="flex justify-between mb-20">
          <div>
            <h2 className="text-xl font-semibold">
              Order ID: {orderDetails._id}
            </h2>
            <p className="text-gray-500">
              Order date:{" "}
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-emerald-700 text-sm">
              Estimated Delivery:{" "}
              {calculatedEstimatedDelivery(orderDetails.createdAt)}
            </p>
          </div>
        </div>

        <div className="mb-20">
          {orderDetails.orderItems?.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.color} | {item.size}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md">${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-600">
              {orderDetails.paymentMethod || "N/A"}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">
              {orderDetails.shippingAddress?.address}
            </p>
            <p className="text-gray-600">
              {orderDetails.shippingAddress?.city},{" "}
              {orderDetails.shippingAddress?.country}
            </p>
          </div>
        </div>

        {/* ✅ Buttons Section */}
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => navigate("/my-orders")}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            See All Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
