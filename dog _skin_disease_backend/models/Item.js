const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');

const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT, // Changed to TEXT for longer descriptions
        allowNull: true, // Make it optional
    },
    howtouse: {
        type: DataTypes.TEXT, // Use TEXT for potentially long instructions
        allowNull: true, // Make it optional
    },
    expdate: {
        type: DataTypes.DATEONLY, // For expiration date
        allowNull: true, // Make it optional
    },
    mfd: {
        type: DataTypes.DATEONLY, // For manufacturing date
        allowNull: true, // Make it optional
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
});

// Define associations
Item.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category', // Use 'category' for the association
});

module.exports = Item;
