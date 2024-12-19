const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Order = require('./Order'); // Ensure this path is correct

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id',
        },
    },
    item_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    item_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    item_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false, // No timestamps needed for this table
});

// Define associations
Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
});

module.exports = OrderItem;
