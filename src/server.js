const express = require('express');
const path = require("path");
const { sequelize } = require('./config/db'); // Importing Sequelize connection
require('dotenv').config(); // Load environment variables
JWT_SECRET="1~TFXeq]?eBA_c|Vo[~"
// Importing Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json()); // Middleware for parsing JSON requests

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
// Serve static files from the public/uploads folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/uploads", express.static("public/uploads"));

// API Test Route
app.get('/', (req, res) => res.send('API is working!'));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use("/api/admin", adminRoutes);
// Start Server After DB Connection
const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
