const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authController = require('../controllers/authController');
const User = require('../models/User');

// Signup Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

module.exports = router;
