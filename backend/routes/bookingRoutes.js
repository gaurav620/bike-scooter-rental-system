const express = require('express');
const { createBooking, cancelBooking, getUserBookings } = require('../controllers/bookingController');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createBooking);
router.put('/:id/cancel', protect, cancelBooking);
router.get('/mybookings', protect, getUserBookings);

module.exports = router;