import { sendWelcomeEmail } from '../services/emailService';

export const testEmail = async () => {
  try {
    await sendWelcomeEmail('test@example.com');
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test email failed:', error);
  }
};

// Uncomment to test email functionality
// testEmail();