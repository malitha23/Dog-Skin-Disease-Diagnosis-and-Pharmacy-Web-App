const Reservation = require('../models/Reservation'); // Adjust the path as needed
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Adjust the path as needed

const makeReservation = async (req, res) => {
    try {
        const user_id = req.user.id; // Make sure this is correctly set up in your authentication middleware

        const { reservation_date, num_of_people, service_type, remark } = req.body;

        // Create a new reservation entry
        const newReservation = await Reservation.create({
            user_id,
            reservation_date,
            num_of_people,
            service_type,
            remark
        });

        res.status(201).json({
            message: 'Reservation created successfully',
            reservationId: newReservation.id
        });
    } catch (error) {
        console.error('Error making reservation:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const getReservations = async (req, res) => {
    try {
        // Fetch all reservations from the database
        const reservations = await Reservation.findAll();
        
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const getUserReservations = async (req, res) => {
    try {
        const user_id = req.user.id; // Make sure this is correctly set up in your authentication middleware

        // Fetch reservations for the specific user from the database
        const reservations = await Reservation.findAll({
            where: {
                user_id: user_id
            }
        });
        
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Update reservation status and send email
const updateReservationStatus = async (req, res) => {
    const { reservationId } = req.params;
    const { status } = req.body;
  
    try {
      // Validate the status
      if (!['pending', 'confirmed', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      // Find and update the reservation
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      // Update reservation status
      reservation.status = status;
      await reservation.save();
  
      // Fetch user email
      const user = await User.findOne({ where: { id: reservation.user_id } }); // Adjust according to your model's user association
      if (!user || !user.email) {
        console.error('User email not found');
        return res.status(500).json({ message: 'Error retrieving user email' });
      }
  
      // Set up the Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'lghmalith@gmail.com',
          pass: 'badwccpklsbwwlzs' // Use the application-specific password or environment variable
        }
      });
  
      // Set up email options
      const mailOptions = {
        from: 'lghmalith@gmail.com',
        to: user.email,
        subject: 'Reservation Status Update',
        text: `Your reservation with ID ${reservationId} has been ${status}. Thank you for your attention!`
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
  
      res.status(200).json({ message: 'Reservation status updated and email sent successfully' });
    } catch (error) {
      console.error('Error updating reservation status or sending email:', error);
      res.status(500).json({ message: 'Error updating reservation status or sending email' });
    }
  };
module.exports = { makeReservation, getReservations, getUserReservations, updateReservationStatus };
