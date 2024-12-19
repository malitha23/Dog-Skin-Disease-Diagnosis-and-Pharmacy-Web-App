// controllers/categoryController.js
const Category = require('../models/Category');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from request parameters
        const category = await Category.findByPk(id); // Find category by primary key (ID)

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Error fetching category' });
    }
};


// Create a new category
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const newCategory = await Category.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category' });
    }
};



// Update an existing category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update({ name });
        res.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category' });
    }
};

// delete an existing category
const deleteCategory  = async (req, res) => {
    try {
        // Find the category by its primary key (usually id)
        const category = await Category.findByPk(req.params.id);
        
        // If the category is not found, return a 404 response
        if (!category) return res.status(404).json({ message: 'Category not found' });
        
        // Remove the category
        await category.destroy();
        
        // Return a success message
        res.json({ message: 'Category deleted' });
      } catch (error) {
        // Return a 500 response if there was an error
        res.status(500).json({ message: error.message });
      }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById };
