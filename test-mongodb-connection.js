const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourism_db';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('Database:', mongoose.connection.db.databaseName);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 MongoDB is not running. Please start MongoDB first.');
      console.error('   On macOS with Homebrew: brew services start mongodb-community');
      console.error('   Or check MONGODB_SETUP.md for installation instructions');
    } else if (error.message.includes('authentication')) {
      console.error('\n💡 Authentication failed. Check your username and password.');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Connection timeout. Check if MongoDB is running and accessible.');
    }
    
    process.exit(1);
  }
}

testConnection();

