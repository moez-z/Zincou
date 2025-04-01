const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// @route GET /api/admin/orders
// @desc Get all orders (admin only )
// @access Private/Admin
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.find({}).populate("user", "name");
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status (admin only )
// @access Private/Admin
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = req.body.isPaid || order.isPaid;
      order.status = req.body.status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete order (admin only )
// @access Private/Admin
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
