const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// @route GET /api/admin/products
// @desc Get all products (admin only )
// @access Private/Admin
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/admin/products
// @desc Create a product (admin only )
// @access Private/Admin
router.post("/", protect, isAdmin, async (req, res) => {
  const { name, image, description, price, category, countInStock } = req.body;
  try {
    const product = new Product({
      name,
      image,
      description,
      price,
      category,
      countInStock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
