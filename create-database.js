// Script to create tourism_db database and a test collection
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourism_db';

async function createDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    
    // Create a test collection with a document to ensure database is created
    const testCollection = mongoose.connection.db.collection('_init');
    await testCollection.insertOne({ 
      message: 'Database initialized',
      createdAt: new Date() 
    });
    
    console.log('✅ Database "tourism_db" created successfully!');
    console.log('📁 You can now see it in MongoDB Compass');
    
    // List all databases
    const adminDb = mongoose.connection.db.admin();
    const { databases } = await adminDb.listDatabases();
    console.log('\n📋 Available databases:');
    databases.forEach(db => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    await mongoose.disconnect();
    console.log('\n✅ Done! Refresh MongoDB Compass to see the database.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createDatabase();

