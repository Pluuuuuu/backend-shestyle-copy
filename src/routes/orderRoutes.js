const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/create', verifyToken, orderController.createOrder); // Create new order
router.get('/history', verifyToken, orderController.getOrderHistory); // Get user's order history
router.get("/admin/orders", verifyToken, isAdmin, orderController.getAllOrders); // Get all orders for admin
router.put('/update/:id', verifyToken, isAdmin, orderController.updateOrderStatus); // Update order status (Admin)

module.exports = router;
