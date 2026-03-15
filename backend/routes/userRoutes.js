const express = require('express');
const rateLimit = require('express-rate-limit');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const protect = require('../middleware/auth');

const router = express.Router();

// Limit auth attempts: max 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;