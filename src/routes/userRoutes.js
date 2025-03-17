//authentication and authorization
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Order = require('../models/Order');
const { checkRole } = require('../middleware/roleMiddleware');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin Routes

// 1️⃣ Admin Dashboard
router.get('/admin-dashboard', isAdmin, async (req, res) => {
    try {
        const sales = await Order.sum('totalPrice');
        const activeUsers = await User.count({ where: { role: 'customer' } });
        const orders = await Order.count();
        return res.json({ sales, activeUsers, orders });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching dashboard data' });
    }
});

// 2️⃣ Manage Users
router.get('/manage-users', isAdmin, async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users' });
    }
});

// Customer Routes

// Customer Profile
router.get('/customer-profile', verifyToken, async (req, res) => {
    try {
        return res.json(req.user); 
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching customer profile' });
    }
});

// Customer Order History
router.get('/order-history', verifyToken, async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.user.id } });
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Login Route (JWT generation)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;




// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Product = require('../models/Product');
// const Order = require('../models/Order');
// const { checkRole } = require('../middleware/roleMiddleware'); // Import role-based access middleware
// const router = express.Router();

// // Admin Routes

// // 1️⃣ Admin Dashboard (Overview of Sales, Revenue, etc.)
// router.get('/admin-dashboard', checkRole('admin'), async (req, res) => {
//     try {
//         // Example data for sales and revenue
//         const sales = await Order.sum('totalPrice');
//         const activeUsers = await User.count({ where: { role: 'customer' } });
//         const orders = await Order.count();
//         const recentActivities = []; // Add some activity log retrieval here

//         return res.json({
//             sales,
//             activeUsers,
//             orders,
//             recentActivities
//         });
//     } catch (error) {
//         return res.status(500).json({ error: 'Error fetching dashboard data' });
//     }
// });

// // 2️⃣ Manage Products
// router.post('/manage-products', checkRole('admin'), async (req, res) => {
//     // Example of adding a product (you can extend with edit/delete as needed)
//     const { name, price, description, categoryId } = req.body;
//     try {
//         const product = await Product.create({ name, price, description, categoryId });
//         return res.status(201).json({ product });
//     } catch (error) {
//         return res.status(500).json({ error: 'Error adding product' });
//     }
// });

// // 3️⃣ Orders Management
// router.get('/orders', checkRole('admin'), async (req, res) => {
//     try {
//         const orders = await Order.findAll();
//         return res.json(orders);
//     } catch (error) {
//         return res.status(500).json({ error: 'Error fetching orders' });
//     }
// });

// // 4️⃣ Users Management
// router.get('/manage-users', checkRole('admin'), async (req, res) => {
//     try {
//         const users = await User.findAll();
//         return res.json(users);
//     } catch (error) {
//         return res.status(500).json({ error: 'Error fetching users' });
//     }
// });

// // Customer Routes

// // Customer Profile
// router.get('/customer-profile', checkRole('customer'), async (req, res) => {
//     try {
//         return res.json(req.user); // Return the customer's profile (we set 'req.user' in middleware)
//     } catch (error) {
//         return res.status(500).json({ error: 'Error fetching customer profile' });
//     }
// });

// // Customer Order History
// router.get('/order-history', checkRole('customer'), async (req, res) => {
//     try {
//         const orders = await Order.findAll({ where: { userId: req.user.id } });
//         return res.json(orders);
//     } catch (error) {
//         return res.status(500).json({ error: 'Error fetching orders' });
//     }
// });

// // Login Route (for JWT generation)
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Generate JWT with user ID and role
//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         return res.json({ token });
//     } catch (error) {
//         return res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;
