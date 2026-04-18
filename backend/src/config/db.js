const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGO_URI environment variable and ensure the credentials are correct and URL-encoded if necessary.');
    // Removed process.exit(1) to prevent the server from continuously crashing/restarting in environments like Render
  }
};

module.exports = connectDB;
