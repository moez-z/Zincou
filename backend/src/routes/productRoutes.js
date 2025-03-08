const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
  const { name, price, description, category, images, sizes, colors, stock } =
    req.body;
  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      images,
      sizes,
      colors,
      stock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
