const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const nodemailer = require('nodemailer'); // Add this line
const User = require("../models/User"); 

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, cartItems, deliveryOption, paymentOption } = req.body;

    // Calculate total amount
    const totalAmount = cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);

    // Create a new order
    const newOrder = await Order.create({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      address: user.address,
      phone_number: user.phone_number,
      email: user.email,
      delivery_option: deliveryOption,
      payment_option: paymentOption,
      total_amount: totalAmount,
      status: 'pending', // Pending
    });

    // Create order items
    const orderItems = cartItems.map((item) => ({
      order_id: newOrder.id,
      item_name: item.name,
      item_price: item.price,
      item_quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    res
      .status(201)
      .json({ message: "Order placed successfully!", orderId: newOrder.id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while placing the order." });
  }
};

// Get orders for a specific user
// Get orders for a specific user
const getOrdersByUsername = async (req, res) => {
    try {
      const username = req.user.username;
      const orders = await Order.findAll({
        where: { username },
        include: [OrderItem], // Include order items if needed
        order: [['created_at', 'DESC']], // Sort orders by created_at in descending order
      });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the orders." });
    }
  };
  
  const getOrdersAll = async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [OrderItem], // Include order items if needed
        order: [['created_at', 'DESC']], // Sort orders by created_at in descending order
      });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the orders." });
    }
  };

  const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
  
    try {
      // Update order status in the database
      const [affectedRows] = await Order.update(
        { status },
        { where: { id: orderId } }
      );
  
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      if (status === 'approved') {
        // Send email to user
        await sendConfirmationEmail(orderId);
    } else if (status === 'rejected') {
        // Send rejection email to user
        await sendRejectionEmail(orderId);
    }
  
      res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating order status' });
    }
  };
  
  
  // Function to send confirmation email
const sendConfirmationEmail = async (orderId) => {
    try {
      // Fetch the order details
      const order = await Order.findByPk(orderId);
  
      if (!order) {
        console.error('Order not found');
        return;
      }
  
      let userEmail = order.email;
  
      // If order email is not set, fetch email from User table using username
      if (!userEmail && order.username) {
        const user = await User.findOne({ where: { username: order.username } });
        if (user) {
          userEmail = user.email;
        } else {
          console.error('User not found');
          return;
        }
      }
  
      if (!userEmail) {
        console.error('No email address found for the order');
        return;
      }
  
      // Set up the Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'lghmalith@gmail.com',
          pass: 'badwccpklsbwwlzs' // Use the application-specific password here
        }
      });
  
      // Set up email options
      const mailOptions = {
        from: 'lghmalith@gmail.com',
        to: userEmail, // Use userEmail instead of order.email
        subject: 'Order Confirmation',
        text: `Your order with ID ${orderId} has been confirmed. Thank you for shopping with us!`
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const sendRejectionEmail = async (orderId) => {
    try {
        // Fetch the order details
        const order = await Order.findByPk(orderId);
  
        if (!order) {
            console.error('Order not found');
            return;
        }
  
        let userEmail = order.email;
  
        // If order email is not set, fetch email from User table using username
        if (!userEmail && order.username) {
            const user = await User.findOne({ where: { username: order.username } });
            if (user) {
                userEmail = user.email;
            } else {
                console.error('User not found');
                return;
            }
        }
  
        if (!userEmail) {
            console.error('No email address found for the order');
            return;
        }
  
        // Set up the Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'lghmalith@gmail.com',
                pass: 'badwccpklsbwwlzs' // Use the application-specific password here
            }
        });
  
        // Set up email options
        const mailOptions = {
            from: 'lghmalith@gmail.com',
            to: userEmail, // Use userEmail instead of order.email
            subject: 'Order Rejection',
            text: `We regret to inform you that your order with ID ${orderId} has been rejected. If you have any questions, please contact us.`
        };
  
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Rejection email sent successfully');
    } catch (error) {
        console.error('Error sending rejection email:', error);
    }
};
 

module.exports = {
  createOrder,
  getOrdersByUsername,
  getOrdersAll,
  updateOrderStatus
};
