const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Stricter email format validation (prevents double-@, consecutive dots, etc.)
const isValidEmail = (email) => /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) && !email.includes('..');

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) return res.status(400).json({ msg: 'Name is required' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ msg: 'Valid email is required' });
  if (!password || password.length < 8) return res.status(400).json({ msg: 'Password must be at least 8 characters' });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User exists' });

    user = new User({ name: name.trim(), email: email.toLowerCase(), password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Profile (requires auth)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { registerUser, loginUser, getProfile };