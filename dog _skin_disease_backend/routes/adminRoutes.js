// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, blockUser, activateUser } = require('../controllers/adminController');

// Route to get all users
router.get('/users', getUsers);

// Route to create a new user
router.post('/users', createUser);

// Route to update an existing user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

// New routes for blocking and activating users
router.put('/users/:id/block', blockUser);
router.put('/users/:id/activate', activateUser);


module.exports = router;
