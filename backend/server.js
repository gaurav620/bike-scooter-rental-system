const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const rideRoutes = require('./routes/rideRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const { errorHandler } = require('./utils/errorHandler');

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// CORS origins
const corsOrigins = [
  'http://localhost:3000',
  'https://bike-scooter-rental-system.vercel.app',
  'https://gaurav620-bike-scooter-rental-syste.vercel.app',
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (corsOrigins.some(o => origin.includes('vercel.app') || origin === o)) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all for now
  },
  credentials: true
}));
app.use(express.json());

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Store io on app for use in controllers
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.send('Hello Gaurav Your API is running🎉Successfully...');
});

// Error handling section
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Not Found' });
});

app.use(errorHandler);

// Use server.listen instead of app.listen for Socket.io
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});