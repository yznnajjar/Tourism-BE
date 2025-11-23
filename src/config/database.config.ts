import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleOptions => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourism_db';
  
  return {
    uri,
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${connection.db.databaseName}`);
      });
      connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });
      connection.on('disconnected', () => {
        console.log('⚠️  MongoDB disconnected');
      });
      return connection;
    },
  };
};
