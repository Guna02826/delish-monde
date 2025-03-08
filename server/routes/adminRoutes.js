const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyAdmin");

router.get("/", verifyToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: "Access denied" });
  res.json({ msg: "Welcome, Admin!" });
});

module.exports = router;
