// It should only verify JWT tokens for route protection
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This function checks if a user is authenticated by verifying their JWT token.
// Ensures the user is logged in.
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log("Token received:", token); // Debugging statement

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided' });
    }

    // validates the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log("Decoded token:", decoded); // Debugging statement

        try {
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = { id: user.id, role: user.role }; // Debugging statement
            console.log("User found:", req.user); // Debugging statement

            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
};

// Ensures the user has admin privileges 
exports.isAdmin = ( req, res, next ) =>
{
    console.log(req.user);
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized. No user found." });
      }

      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
    next(); // Proceeds to the next middleware or route handler.
};
