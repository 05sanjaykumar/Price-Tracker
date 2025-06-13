const mongoose = require('mongoose');


const isDocker = process.env.IS_DOCKER === 'true';

if (!isDocker) {
  const dotenv = require('dotenv');
  const path = require('path');
  dotenv.config({ path: path.join(__dirname, '../../.env.local') });
}


const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in .env.local");
        }

        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
