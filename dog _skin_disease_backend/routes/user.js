// routes/user.js
const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/userController'); // Import the functions
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.use(authenticate); // Authenticate all requests
router.get('/me', getUserData);

module.exports = router;
