const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: [String], required: true }, // Example: Cake, Pastry, Bread
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 }, // Prevent negative stock
  description: { type: String },
  image: { type: String }, // Store image URL or filename
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
