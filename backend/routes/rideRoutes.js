const express = require('express');
const { startRide, endRide } = require('../controllers/rideController');
const protect = require('../middleware/auth');

const router = express.Router();

router.put('/:id/start', protect, startRide);
router.put('/:id/end', protect, endRide);

module.exports = router;