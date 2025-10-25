import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: 0,
    sku: "",
    category: "",
    material: "",
    gender: "",
    sizes: [],
    colors: [],
    collections: [],
    tags: [],
    isFeatured: false,
    isPublished: false,
    rating: "",
    numReviews: 0,
    images: [],
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // You'll need to implement your image upload logic here
    // This is a placeholder - typically you'd upload to Cloudinary, AWS S3, etc.
    try {
      // Example: Upload to your backend
      const formData = new FormData();
      formData.append("image", file);

      // const response = await axios.post('/api/upload', formData);
      // const imageUrl = response.data.url;

      // For now, using a local URL (you should replace this with actual upload)
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, { url: reader.result, altText: "" }],
        }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log(productData);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProduct(productData));

    // Handle form submission logic here
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Basic Information
          </h3>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                value={productData.discountPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2">
                Count in Stock *
              </label>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">SKU *</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2">Category *</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Material *</label>
              <input
                type="text"
                name="material"
                value={productData.material}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Gender *</label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Product Variants */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Product Variants
          </h3>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Sizes (comma-separated) *
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., S, M, L, XL"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Colors (comma-separated) *
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., Red, Blue, Black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Collections (comma-separated) *
            </label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., Summer 2024, New Arrivals"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={productData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., trending, sale, bestseller"
            />
          </div>
        </div>

        {/* Product Status */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Product Status
          </h3>

          <div className="flex gap-6 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={productData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              <label className="font-semibold">Featured Product</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublished"
                checked={productData.isPublished}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              <label className="font-semibold">Published</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={productData.rating}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Number of Reviews
              </label>
              <input
                type="number"
                name="numReviews"
                value={productData.numReviews}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                min="0"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Product Images
          </h3>

          {/* Upload new image */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Upload New Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="mb-4"
              accept="image/*"
            />

            {/* Preview existing images */}
            {productData.images.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-4">
                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg p-2 shadow-sm bg-gray-50"
                  >
                    {/* Image Preview */}
                    <img
                      src={image.url}
                      alt={image.altText || "Product image"}
                      className="w-24 h-24 object-cover rounded-md"
                    />

                    {/* Alt Text Input */}
                    <input
                      type="text"
                      placeholder="Alt text"
                      value={image.altText || ""}
                      onChange={(e) => {
                        const newImages = [...productData.images];
                        newImages[index].altText = e.target.value;
                        setProductData({ ...productData, images: newImages });
                      }}
                      className="w-full mt-2 border border-gray-300 rounded p-1 text-xs"
                    />

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedImages = productData.images.filter(
                          (_, i) => i !== index
                        );
                        setProductData({
                          ...productData,
                          images: updatedImages,
                        });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      title="Delete image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-2">
                No images added yet. Upload one above.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md font-semibold transition-colors bg-green-500 hover:bg-green-600 text-white `}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
