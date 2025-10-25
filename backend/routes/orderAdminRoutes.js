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
    console.log(req.body.status);
    const status = req.body.status;
    const order = await Order.findById(req.params.id);
    if (order && status == "Delivered") {
      order.isDelivered = true;
      order.isPaid = true;
      order.status = status || order.status;

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

// GET total revenue from all paid orders
router.get("/revenue", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { isPaid: true } }, // filter only paid orders
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }, // sum all totalPrice values
          totalOrders: { $sum: 1 }, // optional: count how many paid orders
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    const totalOrders = result.length > 0 ? result[0].totalOrders : 0;

    res.status(200).json({
      totalRevenue: revenue,
      paidOrdersCount: totalOrders,
    });
  } catch (error) {
    console.error("Error calculating revenue:", error);
    res.status(500).json({ message: "Error calculating revenue" });
  }
});

router.get("/summary", async (req, res) => {
  try {
    // Get last 3 orders (sorted by createdAt descending)
    const lastOrders = await Order.find().sort({ createdAt: -1 }).limit(3);

    // Count total orders
    const totalOrders = await Order.countDocuments();
    res.status(200).json({
      totalOrders,
      lastOrders,
    });
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res.status(500).json({ message: "Error fetching order summary" });
  }
});

module.exports = router;
