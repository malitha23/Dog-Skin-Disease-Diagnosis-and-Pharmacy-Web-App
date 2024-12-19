// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);
        
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        console.log('Authorization token:', token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const secretKey = 'abc'; // Use a default key for testing
        console.log('JWT Secret:', secretKey);

        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded);
        const userId = decoded.userId; // Get user ID from token

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach user info to the request object
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Middleware to check if the user has admin role
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };
