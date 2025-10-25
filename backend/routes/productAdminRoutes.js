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
    const totalProducts = await Product.countDocuments();
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
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    sku,
    category,
    material,
    gender,
    sizes,
    colors,
    collections,
    tags,
    isFeatured,
    isPublished,
    rating,
    numReviews,
    images,
  } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      material,
      gender,
      sizes,
      colors,
      collections,
      tags,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      images,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/admin/products/:id
// @desc Delete a user (admin only )
// @access Private/Admin
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
