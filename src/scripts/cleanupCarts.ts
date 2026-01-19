import mongoose from 'mongoose';
import Cart from '../models/Cart';
import dotenv from 'dotenv';

dotenv.config();

const cleanupCarts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/node_mongo_db');
    
    // Remove carts with null or invalid user references
    const result = await Cart.deleteMany({
      $or: [
        { user: null },
        { user: { $exists: false } },
        { userId: null },
        { userId: { $exists: true } }
      ]
    });
    
    console.log(`Cleaned up ${result.deletedCount} invalid cart entries`);
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning up carts:', error);
    process.exit(1);
  }
};

cleanupCarts();