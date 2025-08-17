const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  status: { type: String, enum: ['booked', 'active', 'completed', 'cancelled'], default: 'booked' },
  duration: { type: Number },  // In minutes
  cost: { type: Number },
  paymentStatus: { type: String, default: 'pending' },  // Ensured: pending, paid, failed, etc.
  paymentId: { type: String },  // Added: For Razorpay order ID
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);