const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const startRide = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking.user.toString() !== req.user.id || booking.status !== 'booked') {
      return res.status(400).json({ msg: 'Invalid' });
    }

    booking.status = 'active';
    booking.startTime = Date.now();
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const endRide = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking.user.toString() !== req.user.id || booking.status !== 'active') {
      return res.status(400).json({ msg: 'Invalid' });
    }

    booking.status = 'completed';
    booking.endTime = Date.now();
    const actualDuration = (booking.endTime - booking.startTime) / 60000;
    booking.duration = actualDuration;
    booking.cost = actualDuration * 0.5;
    await booking.save();

    const vehicle = await Vehicle.findById(booking.vehicle);
    vehicle.status = 'available';
    vehicle.mileage += 10;
    await vehicle.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { startRide, endRide };