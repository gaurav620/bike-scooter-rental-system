const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { vehicleId, startTime, duration } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (vehicle.status !== 'available') return res.status(400).json({ msg: 'Unavailable' });

    const booking = new Booking({
      user: req.user.id,  // From auth
      vehicle: vehicleId,
      startTime,
      duration,
      cost: duration * 0.5,  // Simplified pricing
    });
    await booking.save();

    vehicle.status = 'in-use';
    await vehicle.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    booking.status = 'cancelled';
    await booking.save();

    const vehicle = await Vehicle.findById(booking.vehicle);
    vehicle.status = 'available';
    await vehicle.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get User Bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createBooking, cancelBooking, getUserBookings };