import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      toast.info(`Quantity decreased to ${quantity - 1}`);
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    toast.info(`Quantity increased to ${quantity + 1}`);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    toast.success(`Selected color: ${color}`);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    toast.success(`Selected size: ${size}`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id || null,
      })
    )
      .then(() => {
        toast.success(
          `Added to cart: ${selectedProduct.name} - ${selectedColor}, Size ${selectedSize}, Quantity: ${quantity}`,
          {
            duration: 1500,
            action: {
              label: "View Cart",
              onClick: () => navigate("/my-cart"),
            },
          }
        );
      })
      .finally(() => {
        setSelectedSize("");
        setSelectedColor("");
        setQuantity(1);
      });
  };
  useEffect(() => {
    if (
      selectedProduct &&
      selectedProduct.images &&
      selectedProduct.images.length > 0
    ) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!selectedProduct) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* Left thumbnails */}
        <div className="hidden md:flex flex-col space-y-4 mr-6">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                mainImage === image ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setMainImage(image.url)}
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>

        {/* Main image */}
        <div className="md:w-1/2">
          <div className="mb-4">
            <img
              src={mainImage}
              alt="Main product"
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div className="mt-6 text-sm text-gray-600">
            {selectedSize && selectedColor && (
              <p>
                Selected: {selectedColor} / Size {selectedSize} / Quantity:{" "}
                {quantity}
              </p>
            )}
          </div>
        </div>

        {/* Mobile thumbnails */}
        <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4 snap-x snap-mandatory">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border snap-start ${
                mainImage === image ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setMainImage(image)}
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>

        {/* Right side */}
        <div className="md:w-1/2 md:ml-10">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {selectedProduct.name}
          </h1>
          <p className="text-lg text-gray-600 mb-1 line-through">
            ${selectedProduct.originalPrice}
          </p>
          <p className="text-xl text-gray-500 mb-2">${selectedProduct.price}</p>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

          <div className="mb-4">
            <p className="text-gray-700">Colors:</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                  style={{
                    background: color.toLowerCase(),
                    filter: "brightness(0.85)",
                  }}
                  aria-label={`Select color ${color}`}
                  onClick={() => handleColorSelect(color)}
                ></button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700">Size:</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded border ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">Quantity:</p>
            <div className="flex items-center space-x-4 mt-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded text-lg"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded text-lg"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="bg-black text-white py-2 px-6 rounded w-full mb-4 hover:bg-gray-800 transition-colors"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            ADD TO CART
          </button>

          <div className="mt-10 text-gray-700">
            <h3 className="text-xl font-bold mb-4">Characteristics</h3>
            <table className="w-full text-left text-sm text-gray-600">
              <tbody>
                <tr>
                  <td className="py-1">Brand</td>
                  <td className="py-1">{selectedProduct.brand}</td>
                </tr>
                <tr>
                  <td className="py-1">Material</td>
                  <td className="py-1">{selectedProduct.material}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl text-center font-medium mb-4">
          You May Also Like
        </h2>
        <ProductGrid products={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
