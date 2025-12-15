import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGO_URI ? 'Found' : 'NOT FOUND');
    
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not found in .env file');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    
    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`   Collections: ${collections.length} found`);
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(`   Error: ${error.message}`);
    if (error.message.includes('authentication')) {
      console.error('   → Check your username and password');
    } else if (error.message.includes('timeout')) {
      console.error('   → Check your IP whitelist in MongoDB Atlas');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('   → Check your cluster URL');
    }
    process.exit(1);
  }
}

testConnection();

