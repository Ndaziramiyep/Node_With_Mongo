import { sendVerificationEmail } from '../services/emailService';

export const testEmail = async () => {
  try {
    await sendVerificationEmail('test@example.com', 'test-token-123');
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test email failed:', error);
  }
};

// Uncomment to test email functionality
// testEmail();