// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as per your directory structure

const JWT_SECRET = 'abc'; // Default for local development


const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'role', 'status', 'created_at'],
            order: [['created_at', 'DESC']] // Sort by created_at in descending order
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    const { username, email, password, first_name, last_name, phone_number, address, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !first_name || !last_name || !phone_number || !address || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Validate phone number length (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ message: 'Phone number must be exactly 10 digits long.' });
    }

    try {
        // Check if the username or email already exists
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            phone_number,
            address,
            role
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id, email: newUser.email, iat: 1  }, JWT_SECRET);

        // Send the token and user data as response
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                phone_number: newUser.phone_number,
                address: newUser.address,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};



const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username or username or email, depending on your system
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.username, iat: 1  }, JWT_SECRET);

        // Send the token and user data as response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

const getUserData = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from token
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'role', 'status', 'created_at']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserData
};
