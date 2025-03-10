import React, { useState } from "react";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} action="">
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-6">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            className="w-full border border-gray-500 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-6">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded-md p-2"
            rows={4}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            className="w-full border border-gray-500 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            className="w-full border border-gray-500 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="black font-semibold mb-2">
            Upload Image
          </label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div className="" key={index}>
                {" "}
                <img
                  src={image.url}
                  alt={image.altText || "Product"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
