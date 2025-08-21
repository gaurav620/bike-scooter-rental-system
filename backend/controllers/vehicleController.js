const Vehicle = require('../models/Vehicle');

// Add Vehicle (admin only, but simplify no auth for now)
const addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Vehicles
const getVehicles = async (req, res) => {
  try {
    const { location, startDate, endDate } = req.query;
    let query = { status: 'available' };
    if (location) query.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    // For dates, add logic if bookings overlap (simplified)
    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Status (simulate tracking)
const updateVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { addVehicle, getVehicles, updateVehicleStatus };