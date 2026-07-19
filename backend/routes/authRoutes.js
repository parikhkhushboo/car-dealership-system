const express = require('express');
const router = express.Router();

// ✅ IMPORT BOTH FUNCTIONS
const { register, login } = require('../controllers/authController');

// ✅ DEBUG (temporary)
console.log("REGISTER:", register);
console.log("LOGIN:", login);

// ✅ ROUTES
router.post('/register', register);
router.post('/login', login);

module.exports = router;