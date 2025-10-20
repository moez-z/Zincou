import React, { useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContents = () => {
  const { selectedCart, loading, error } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart({ userId: user?._id, guestId }));
  }, [dispatch, user?._id, guestId]);

  // Normalize product data to handle inconsistent property names
  const normalizeProduct = (product) => ({
    id: product._id || product.productId,
    name: product.name,
    image: product.images?.[0] || product.image,
    size: product.size || product.sizes,
    color: product.color || product.colors,
    price: product.price,
    quantity: product.quantity,
  });

  // Handle quantity changes
  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity < 1) return;

    const normalized = normalizeProduct(product);

    dispatch(
      updateCartItemQuantity({
        userId: user?._id,
        guestId,
        productId: normalized.id,
        quantity: newQuantity,
        size: normalized.size,
        color: normalized.color,
      })
    );
  };

  // Handle product removal
  const handleRemoveProduct = (product) => {
    const normalized = normalizeProduct(product);

    dispatch(
      removeFromCart({
        productId: normalized.id,
        guestId,
        userId: user?._id,
        size: normalized.size,
        color: normalized.color,
      })
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-pulse text-gray-600">Loading cart...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    console.log(error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
        <p className="text-red-800 font-medium">Error loading cart</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
    );
  }

  const productsToRender = selectedCart?.products || [];

  // Empty cart state
  if (productsToRender.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  // Cart items
  return (
    <div>
      {productsToRender.map((product) => {
        const normalized = normalizeProduct(product);

        return (
          <div
            key={normalized.id}
            className="flex items-start justify-between py-4 border-b last:border-b-0"
          >
            <div className="flex items-start">
              <img
                src={normalized.image}
                alt={normalized.name}
                className="w-20 h-20 object-cover mr-4 rounded"
              />
              <div>
                <h3 className="font-medium">{normalized.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Size: {normalized.size} | Color: {normalized.color}
                </p>
                <div className="flex items-center mt-3 gap-2">
                  <button
                    className="border rounded px-3 py-1 text-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() =>
                      handleQuantityChange(product, normalized.quantity - 1)
                    }
                    disabled={normalized.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center font-medium">
                    {normalized.quantity}
                  </span>
                  <button
                    className="border rounded px-3 py-1 text-lg font-medium hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      handleQuantityChange(product, normalized.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${normalized.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">
                Total: ${(normalized.price * normalized.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoveProduct(product)}
                className="mt-3 inline-flex items-center justify-center p-2 rounded hover:bg-red-50 transition-colors"
                aria-label="Remove item from cart"
              >
                <RiDeleteBin3Line className="h-5 w-5 text-red-600 hover:text-red-800" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
