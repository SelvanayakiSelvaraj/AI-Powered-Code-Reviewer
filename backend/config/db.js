const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`\n⚠️ Atlas connection failed (${error.message}).\n`);
    console.log(`🔄 Automatically falling back to Local Memory Database...`);
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`✅ Local Memory MongoDB Connected: ${conn.connection.host}`);
      console.log(`NOTE: Data is saved temporarily for this session to keep you unblocked!\n`);
    } catch (fallbackError) {
      console.error(`❌ Critical Error: Could not start local database either: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
