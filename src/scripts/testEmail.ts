import dotenv from 'dotenv';
import { sendWelcomeEmail } from '../services/emailService';

dotenv.config();

const testEmailConfig = async () => {
  console.log('Testing email configuration...');
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
  
  try {
    await sendWelcomeEmail('test@example.com');
    console.log('✅ Email test successful');
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
};

testEmailConfig();