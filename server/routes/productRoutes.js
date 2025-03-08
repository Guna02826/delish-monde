const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

router.get("/", async (req, res) => {
  try {
    const cakes = await Product.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cakes = await Product.findById(req.params.id);
    res.status(200), json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route.get("/category/:category", async (req, res) => {
//   try {
//     const cakes = await Product.find({ category: req.params.category });
//     res.json(cakes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.post("/", async (req, res) => {
  const cake = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newCake = await cake.save();
    res.status(201).json(newCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add multiple cakes at once
router.post("/bulk", async (req, res) => {
  try {
    const cakes = req.body; // Expecting an array of cakes in the request body
    const newCakes = await Product.insertMany(cakes);
    res.status(201).json({ msg: "Cakes added successfully!", cakes: newCakes });
  } catch (error) {
    res.status(500).json({ msg: "Error adding cakes", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cake = await Product.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    cake.name = req.body.name;
    cake.category = req.body.category;
    cake.price = req.body.price;
    cake.stock = req.body.stock;
    cake.description = req.body.description;
    cake.image = req.body.image;

    const updatedCake = await cake.save();
    res.json(updatedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cake = await Product.findById(req.params.id);
    const deletedCake = await cake.remove();
    res.json(deletedCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
