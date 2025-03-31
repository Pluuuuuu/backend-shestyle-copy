const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    // Get the token from the request header
    const token = req.headers['authorization']?.split(' ')[1];  // 'Bearer <token>'

    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use your secret key here
    const userId = decoded.id;  // Extract user ID from the decoded token

    // Find the user in the database
    const user = await User.findByPk(userId, { attributes: ["id", "name", "email"] });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Get the token from the request header
    const token = req.headers['authorization']?.split(' ')[1];  // 'Bearer <token>'

    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use your secret key here
    const userId = decoded.id;  // Extract user ID from the decoded token

    // Find the user in the database
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get the updated data from the request body
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
