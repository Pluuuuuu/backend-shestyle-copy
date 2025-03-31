const express = require('express');
const {verifyToken, isAdmin } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Admin Routes
router.post("/add", verifyToken, isAdmin, categoryController.addCategory);
router.delete('/delete/:id', verifyToken, isAdmin, categoryController.deleteCategory);
router.put(
  "/update/:id",
  verifyToken ,isAdmin,
  categoryController.updateCategory
);

// Public Routes
router.get('/', categoryController.getAllCategories);

module.exports = router;
