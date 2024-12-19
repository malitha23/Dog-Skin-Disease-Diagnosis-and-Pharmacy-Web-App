const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    delivery_option: {
        type: DataTypes.ENUM('pickup', 'delivery'),
        allowNull: false,
    },
    payment_option: {
        type: DataTypes.ENUM('card', 'cash'),
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed','rejected'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false, // Disable updatedAt if not needed
});

module.exports = Order;
