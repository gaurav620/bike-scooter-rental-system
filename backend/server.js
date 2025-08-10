const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());  // Parse JSON bodies
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello Gaurav Your API is running🎉Successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));