const jwt = require("jsonwebtoken");
const isAdmin = require("../models/userModel");
const user = require("../models/userModel");
require("dotenv").config();

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); // Same key as login
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    if (!decoded.isAdmin)
      return res.status(403).json({ message: "Access denied" });

    req.user = decoded; // Attach user data
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;
