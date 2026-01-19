import dotenv from 'dotenv';
import { connectDB } from './config/database';
import User, { UserRole } from './models/User';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    
    const existingUser = await User.findOne({ email: 'patrickndaziramiye03@gmail.com' });
    
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    const admin = await User.create({
      email: 'patrickndaziramiye03@gmail.com',
      password: '1234',
      role: UserRole.ADMIN
    });
    
    console.log('Admin user created successfully:', {
      id: admin._id,
      email: admin.email,
      role: admin.role
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
