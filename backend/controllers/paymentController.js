const Booking = require('../models/Booking');
const Razorpay = require('razorpay');
const { AppError } = require('../utils/errorHandler');
const crypto = require('crypto');  // For signature verification

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const createOrder = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError('Booking not found', 404);
    if (booking.user.toString() !== req.user.id) throw new AppError('Unauthorized', 401);
    if (booking.paymentStatus === 'paid') throw new AppError('Already paid', 400);

    const options = {
      amount: booking.cost * 100,  // In paise (Indian currency)
      currency: 'INR',
      receipt: booking._id.toString(),
    };

    const order = await rzp.orders.create(options);
    booking.paymentId = order.id;  // Save order ID
    await booking.save();

    res.json({ order, key: process.env.RAZORPAY_KEY_ID });  // Send to frontend
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

// Verify Payment (Webhook or Callback from Frontend)
const verifyPayment = async (req, res) => {
  const { bookingId } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError('Booking not found', 404);

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      throw new AppError('Invalid signature', 400);
    }

    booking.paymentStatus = 'paid';
    await booking.save();

    res.json({ msg: 'Payment verified', booking });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

module.exports = { createOrder, verifyPayment };