const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Test admin route
router.get("/test", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Admin access granted",
    user: req.user,
  });
});

module.exports = router;
