// It should only verify JWT tokens for route protection
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This function checks if a user is authenticated by verifying their JWT token.
// Ensures the user is logged in.
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided' });
    }

    // validates the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        try {
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = { id: user.id, role: user.role };
            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
};

//Ensures the user has admin privileges 
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); //Proceeds to the next middleware or route handler.
};




// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// // const { User } = require('../models/User'); // Sequelize models are in the models folder

// require('dotenv').config();

// // User Signup
// exports.signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const user = await User.create({ name, email, password: hashedPassword });

//         // Generate JWT Token
//         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({
//             message: 'User registered successfully',
//             token,
//             user: { id: user.id, name: user.name, email: user.email }
//         });

//     } catch (error) {
//         console.error('Signup Error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // User Login
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Validate password
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: { id: user.id, name: user.name, email: user.email }
//         });

//     } catch (error) {
//         console.error('Login Error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


