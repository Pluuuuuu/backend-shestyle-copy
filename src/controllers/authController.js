const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/db'); 

// Signup endpoint  | Registration
//Ensured bcrypt.hash is used before saving passwords.
exports.signup = async (req, res) => {
    try {
        const { username:name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        // Check if user already exists
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword); // Log this to confirm it's hashed
        // Create new user
        const newUser = await User.create({ name, email, password: hashedPassword, role });
        // Send response with the token
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Signup endpoint | Registration
exports.login = async (req, res) => {
  console.log("HELLO");
  try {
    const { email, password } = req.body;

    console.log("Received login request with email:", email);

    // Step 1: Find the user by email
    const user = await User.findOne({ where: { email } });
    console.log("User found:", user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials, User not found" });
    }

    console.log("Incoming Password (Plain):", password);

    console.log("Stored Password Hash:", user.password);

    // Step 2: Compare hashed password from user input with stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials, Wrong Password" });
    }
    //const myPassword = "$2b$10$INRWn9wo/dmrQ6lrJLpVv.YjDFpZLaHzZble6y.TKc4sC6s9CdakC";
    //console.log("CHECK:", user.password === myPassword)

    // Step 2: Hash the provided password before comparing
    //   const hashedInputPassword = await bcrypt.hash(password, 10);
    //   console.log("Hashed Input Password:", hashedInputPassword);

    // Step 3: Compare hashed password from user input with stored hash
    // ✅ Ensure bcrypt compares correctly
    //   const isMatch = await bcrypt.compare(password, user.password);

    //   console.log("Password Match:", isMatch);

    //   if (!isMatch) {
    //     return res
    //       .status(401)
    //       .json({ message: "Invalid credentials, Wrong Password" });
    //   }

    // Step 4: Generate a token for authenticated user (if needed)

    //       const token = console.log("JWT_SECRET:", process.env.JWT_SECRET);
    //         jwt.sign(
    //         { id: user.id, email: user.email, role: user.role },
    //         process.env.JWT_SECRET,
    //         {
    //           expiresIn: "1h",
    //         }
    //       );

    //       return res.json({ message: "Login successful", token });
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // };
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 4. Return success response with token
    res.json({
      success: true,
      message: "Login successful",
      token, // Now properly included
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};