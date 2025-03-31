const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware'); // Ensure correct folder name
// const { isAdmin } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();

// Admin Routes
router.post('/add',  verifyToken, isAdmin, productController.addProduct);
router.put('/update/:id',  verifyToken, isAdmin, productController.updateProduct);
router.delete('/delete/:id',  verifyToken, isAdmin, productController.deleteProduct);

// Public Routes
router.get('/all', productController.getAllProducts); // List all products
router.get('/:id', productController.getProductById); // Get product by ID
router.get('/category/:categoryId', productController.getProductsByCategory); // Get products by category

module.exports = router;



// const express = require('express');
// const { isAdmin } = require('../middlewares/authMiddleware');
// const productController = require('../controllers/productController');

// const router = express.Router();

// // Admin Routes
// router.post('/add', isAdmin, productController.addProduct);
// router.put('/update/:id', isAdmin, productController.updateProduct);
// router.delete('/delete/:id', isAdmin, productController.deleteProduct);
// // Public Routes
// router.get('/all', productController.getAllProducts); // List all products
// router.get('/:id', productController.getProductById); // Get product by ID
// router.get('/category/:categoryId', productController.getProductsByCategory); // Get products by category

// module.exports = router;
