const express = require('express');
const { makeReservation, getReservations, getUserReservations, updateReservationStatus } = require('../controllers/reservationController');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

router.get('/starfreservations', getReservations); 

router.put('/updatereservation/:reservationId', updateReservationStatus);

router.use(authenticate); 
router.post('/make', makeReservation);
router.get('/userreservations', getUserReservations); 

module.exports = router;

