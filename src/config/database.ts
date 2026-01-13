import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodedb';
    await mongoose.connect(mongoURI);
    
    // Drop problematic index if it exists
    try {
      await mongoose.connection.db.collection('products').dropIndex('id_1');
    } catch (indexError) {
      // Index might not exist, ignore error
    }
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

