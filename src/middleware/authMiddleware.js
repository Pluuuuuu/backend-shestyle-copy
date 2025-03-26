const jwt = require("jsonwebtoken");
const User = require('../models/User');

// Middleware to verify the JWT token
exports.verifyToken = async (req, res, next) => {
    try {
        console.log("Incoming Headers:", req.headers); // Debugging statement

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("No valid auth header found."); // Debug
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token); // Debugging statement

        console.log( "JWT Secret in Backend:", process.env.JWT_SECRET ); 
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging statement

        const user = await User.findByPk(decoded.id);
        if (!user) {
            console.log("User not found in database."); // Debug
            return res.status(401).json({ message: "Unauthorized. No user found." });
        }

        req.user = { id: user.id, role: user.role }; // Attach user data to request
        console.log("User attached to req:", req.user); // Debugging statement

        next();
    } catch (error) {
        console.log("Error in authentication:", error.message); // Debugging statement
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

// Middleware to check if user has admin privileges
exports.isAdmin = (req, res, next) => {
    console.log("User in isAdmin Middleware:", req.user); // Debugging statement

    if (!req.user) {
        console.log("No user attached to req in isAdmin");
        return res.status(401).json({ message: "Unauthorized. No user found." });
    }

    if (req.user.role !== "admin") {
        console.log("User is not an admin:", req.user.role); // Debugging statement
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); // Proceed to the next middleware or route handler
};
