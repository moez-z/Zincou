const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true }, // Array of image URLs
    sizes: { type: [String], required: true }, // Array of sizes
    colors: { type: [String], required: true }, // Array of colors
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
