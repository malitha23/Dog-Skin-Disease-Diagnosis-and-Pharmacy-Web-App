const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const User = require('./models/User');
const Reservation = require('./models/Reservation');
const Category = require('./models/Category');
const Item = require('./models/Item');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const userRoutes = require('./routes/user'); // Import user routes
const reservationRoutes = require('./routes/reservationRoutes');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ordersRoutes = require('./routes/orderRoutes');
const { authenticate, authorizeAdmin } = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/items', express.static(path.join(__dirname, 'public/items')));
// Test the database connection and synchronize models
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
        return sequelize.sync(); // This will create the tables if they do not exist
    })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// Routes
// Apply authentication and authorization middleware to all admin routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/user', userRoutes); // Use user routes
app.use('/api/itemRoutes', itemRoutes);
app.use('/api/categoryRoutes', categoryRoutes);
app.use('/api/ordersRoutes', ordersRoutes);
app.use(authenticate); // Authenticate all requests
app.use(authorizeAdmin); // Authorize only admin users
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
