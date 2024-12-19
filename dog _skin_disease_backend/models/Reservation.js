const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Reservation = sequelize.define('Reservation', {
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    num_of_people: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_type: {
        type: DataTypes.ENUM('breakfast', 'dinner', 'lunch'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
        defaultValue: 'pending',
    },
    remark: {
        type: DataTypes.STRING(250),
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

// Associate Reservation with User
Reservation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Reservation;
