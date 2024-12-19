// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById } = require('../controllers/categoryController');

// Route to get all categories
router.get('/categories', getAllCategories);

// Route to create a new category
router.post('/categories', createCategory);

// Route to update an existing category
router.put('/categories/:id', updateCategory);

// Route to delete a category
router.delete('/categories/:id', deleteCategory);

// Route to get a specific category by ID
router.get('/categories/:id', getCategoryById);

module.exports = router;
