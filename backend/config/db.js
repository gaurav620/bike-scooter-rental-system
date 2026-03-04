const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`MongoDB connection attempt ${attempt}/${maxRetries}...`);
            console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 15000,
                connectTimeoutMS: 15000,
            });

            console.log('MongoDB connected successfully');
            return;
        } catch (err) {
            console.error(`MongoDB connection attempt ${attempt} failed:`, err.message);

            if (attempt < maxRetries) {
                const delay = attempt * 2000;
                console.log(`Retrying in ${delay / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('All MongoDB connection attempts failed. Exiting.');
                process.exit(1);
            }
        }
    }
};

module.exports = connectDB;