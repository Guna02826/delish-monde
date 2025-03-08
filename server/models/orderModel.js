const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer placing order
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bakery",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
