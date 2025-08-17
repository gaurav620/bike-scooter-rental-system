const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/:bookingId/order', protect, createOrder);  // Create order
router.post('/:bookingId/verify', protect, verifyPayment);  // Verify after payment

module.exports = router;