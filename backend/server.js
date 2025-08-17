const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const rideRoutes = require('./routes/rideRoutes');
const supportRoutes = require('./routes/supportRoutes'); // Optional, add if you have it
const { errorHandler } = require('./utils/errorHandler');

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes); // Critical for payment
app.use('/api/rides', rideRoutes); // Critical for start/end ride
app.use('/api/support', supportRoutes); // Optional

// Error handling middleware
app.get('/', (req, res) => {
  res.send('Hello Gaurav Your API is running🎉Successfully...');
});

// Updated error handling section
app.use((req, res, next) => {
  // 404 handler for undefined routes
  res.status(404).json({ msg: 'Not Found' });
});

app.use(errorHandler);  // Global error handler middleware


app.listen(PORT,()=>{
    console.log('server is running port 5000');
})