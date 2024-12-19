const { Sequelize } = require('sequelize');

// Read environment variables from .env file
require('dotenv').config();

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable logging, you can set it to true for debugging
});

module.exports = sequelize;
