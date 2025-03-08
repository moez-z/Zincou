import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1234",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=1",
            },
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 120, // Added totalPrice
          status: "Delivered", // Added status
        },
        {
          _id: "1235",
          createdAt: new Date(),
          shippingAddress: { city: "Los Angeles", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 60, // Added totalPrice
          status: "Shipped", // Added status
        },
        {
          _id: "1236",
          createdAt: new Date(),
          shippingAddress: { city: "Chicago", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=4",
            },
          ],
          totalPrice: 80, // Added totalPrice
          status: "Processing", // Added status
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/:${orderId}"`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Order ID
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Created
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Shipping Address
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Items
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="py-4 px-4 sm:px-6">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
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
                    {order.orderItems.length}
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
