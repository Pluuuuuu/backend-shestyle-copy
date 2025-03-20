const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Admin Routes
router.post('/add', categoryController.addCategory);
router.delete('/delete/:id', isAdmin, categoryController.deleteCategory);
router.put('/update/:id', isAdmin, categoryController.updateCategory);

// Public Routes
router.get('/', categoryController.getAllCategories);

module.exports = router;
