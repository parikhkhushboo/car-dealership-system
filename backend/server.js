const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();   // ✅ FIXED
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send("API is running...");
});

// Routes
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));