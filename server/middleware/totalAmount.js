const Bakery = require("../models/productModel"); // Import Bakery model

const calculateTotalAmount = async (req, res, next) => {
  try {
    let total = 0;

    // Loop through each item in the order request
    for (const item of req.body.items) {
      const product = await Bakery.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }
      total += product.price * item.quantity; // Multiply price with quantity
    }

    req.body.totalAmount = total; // Attach totalAmount to request body
    next(); // Move to the next middleware/controller
  } catch (error) {
    res.status(500).json({
      message: "Error calculating total amount",
      error: error.message,
    });
  }
};

module.exports = calculateTotalAmount;
