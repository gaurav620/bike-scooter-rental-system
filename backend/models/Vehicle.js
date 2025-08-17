const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  type: { type: String, enum: ['bike', 'scooter'], required: true },
  condition: { type: String, default: 'good' },
  location: { type: String },  // e.g., 'lat,long' or address
  status: { type: String, enum: ['available', 'in-use', 'maintenance'], default: 'available' },
  battery: { type: Number, default: 100 },  // For scooters
  mileage: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);