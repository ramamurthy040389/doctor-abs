const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/clinic';
  try {
    // Mongoose 9+ doesn't need/use the old options; call connect with just the URI (and optional settings)
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message || err);
    throw err;
  }
};

module.exports = connectDB;
