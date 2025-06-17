import React, { useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartContents = () => {
  const { selectedCart, loading, error } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart1 = [];

  useEffect(() => {
    dispatch(fetchCart({ userId: user?._id, guestId }));
  }, [dispatch, user?._id, guestId]);

  // Handle quantity changes
  const handleQuantityChange = (productId, newQuantity) => {
    // Add your quantity update logic here
    console.log(`Update product ${productId} to quantity ${newQuantity}`);
  };

  // Handle product removal
  const handleRemoveProduct = (productId) => {
    // Add your remove product logic here
    console.log(`Remove product ${productId}`);
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart: {error}</div>;

  return (
    <div>
      {cart1.map((product, index) => (
        <div
          key={product._id || product.productId || index} // Better key
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.images?.[0] || product.image} // Handle array or single image
              alt={product.name}
              className="w-20 h-20 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size || product.sizes} | color:{" "}
                {product.color || product.colors}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleQuantityChange(
                      product._id || product.productId,
                      product.quantity - 1
                    )
                  }
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleQuantityChange(
                      product._id || product.productId,
                      product.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">$ {product.price}</p>
            <p className="text-sm text-gray-500">
              Total: $ {(product.price * product.quantity).toFixed(2)}
            </p>
            <button
              onClick={() =>
                handleRemoveProduct(product._id || product.productId)
              }
              className="mt-2"
            >
              <RiDeleteBin3Line className="h-6 w-6 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
