const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING(50),
    },
    last_name: {
        type: DataTypes.STRING(50),
    },
    phone_number: {
        type: DataTypes.STRING(20),
    },
    address: {
        type: DataTypes.STRING(250),
    },
    role: {
        type: DataTypes.STRING(20),
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false, // Disable updatedAt field if not needed
});

module.exports = User;
