const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, isAdmin, orderController.getAllOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.put('/:id/status', verifyToken, isAdmin, orderController.updateOrderStatus);
router.delete('/:id', verifyToken, isAdmin, orderController.deleteOrder);

module.exports = router;

