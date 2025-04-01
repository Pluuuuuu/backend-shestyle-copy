const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");
const { validateProduct } = require("../middleware/validationMiddleware");
const multer = require("multer");
const path = require("path");

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Save images to /public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

const router = express.Router();

// Admin Routes
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.array("images", 5), // Allow multiple images (max 5)
  validateProduct,
  productController.addProduct,
  async (req, res) => {
    console.log(req.file); // Debugging
    res.json({ message: "File uploaded successfully", file: req.file });
  }
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"), // Allow updating image
  validateProduct,
  productController.updateProduct
);
router.delete("/:id", verifyToken, isAdmin, productController.deleteProduct);

// Public Routes
router.get("/", productController.getAllProducts); // Supports pagination
router.get("/id/:id", productController.getProductById);
// router.get("/slug/:slug", productController.getProductBySlug);
router.get("/category/:categoryId", productController.getProductsByCategory);

module.exports = router;

// const express = require('express');
// const { verifyToken, isAdmin } = require('../middleware/authMiddleware'); // Ensure correct folder name
// // const { isAdmin } = require('../middlewares/authMiddleware');
// const productController = require('../controllers/productController');

// const router = express.Router();

// // Admin Routes
// router.post('/add',  verifyToken, isAdmin, productController.addProduct);
// router.put('/update/:id',  verifyToken, isAdmin, productController.updateProduct);
// router.delete('/delete/:id',  verifyToken, isAdmin, productController.deleteProduct);

// // Public Routes
// router.get('/all', productController.getAllProducts); // List all products
// router.get('/:id', productController.getProductById); // Get product by ID
// router.get('/category/:categoryId', productController.getProductsByCategory); // Get products by category

// module.exports = router;

// // const express = require('express');
// // const { isAdmin } = require('../middlewares/authMiddleware');
// // const productController = require('../controllers/productController');

// // const router = express.Router();

// // // Admin Routes
// // router.post('/add', isAdmin, productController.addProduct);
// // router.put('/update/:id', isAdmin, productController.updateProduct);
// // router.delete('/delete/:id', isAdmin, productController.deleteProduct);
// // // Public Routes
// // router.get('/all', productController.getAllProducts); // List all products
// // router.get('/:id', productController.getProductById); // Get product by ID
// // router.get('/category/:categoryId', productController.getProductsByCategory); // Get products by category

// // module.exports = router;
