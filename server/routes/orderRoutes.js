const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const verifyToken = require("../middleware/verifyToken"); // JWT Authentication Middleware
const verifyAdmin = require("../middleware/verifyAdmin"); // Admin Middleware
const calculateTotalAmount = require("../middleware/totalAmount"); // Calculate Total Amount Middleware

// 🟢 1️⃣ Place a New Order (Customer)
router.post("/", verifyToken, calculateTotalAmount, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const newOrder = new Order({
      userId: req.user.id, // Extracted from JWT
      items,
      totalAmount,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

// 🔵 2️⃣ Get All Orders (Admin Only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email")
      .populate("items.productId", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// 🟠 3️⃣ Get Orders for Logged-In User (Customer)
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "items.productId",
      "name price"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
});

// 🟡 4️⃣ Update Order Status (Admin Only)
router.put("/:orderId/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});

// 🟠 5️⃣ Cancel Order (Customer Only)
router.put("/:orderId/cancel", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    });

    if (!order)
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });

    if (order.status === "Shipped" || order.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Order cannot be canceled at this stage" });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error canceling order", error });
  }
});

// 🔴 6️⃣ Delete an Order (Admin Only)
router.delete("/:orderId", verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

module.exports = router;
