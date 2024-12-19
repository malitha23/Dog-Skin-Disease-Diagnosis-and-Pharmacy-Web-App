const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUsername, getOrdersAll, updateOrderStatus } = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');

// Route for creating a new order
router.post('/order', createOrder);

router.get('/stafforders', getOrdersAll);

router.put('/update/:orderId', updateOrderStatus); 

router.use(authenticate); 
router.get('/orders', getOrdersByUsername);


module.exports = router;
