const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "Debit Card", "PayPal", "UPI", "Cash"] },
    transactionId: { type: String, unique: true, required: true }, // Unique Transaction ID
    status: { type: String, required: true, enum: ["Paid", "Failed", "Pending"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
