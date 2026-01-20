import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email - Node With Mongo',
    html: `
      <h2>Email Verification Required</h2>
      <p>Thank you for registering with Node With Mongo!</p>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

export const sendWelcomeEmail = async (email: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Node With Mongo!',
    html: `
      <h2>Welcome!</h2>
      <p>Thank you for registering with Node With Mongo.</p>
      <p>You can now start shopping and managing your account.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset. Use this token:</p>
      <p><strong>${resetToken}</strong></p>
      <p>This token expires in 1 hour.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

export const sendPasswordChangedEmail = async (email: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Changed Successfully',
    html: `
      <h2>Password Changed</h2>
      <p>Your password has been successfully changed.</p>
      <p>If you didn't make this change, please contact support immediately.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

export const sendOrderPlacedEmail = async (email: string, orderId: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Placed Successfully',
    html: `
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <p>Order ID: <strong>${orderId}</strong></p>
      <p>We'll notify you when your order status changes.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

export const sendOrderStatusEmail = async (email: string, orderId: string, status: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order ${status}`,
    html: `
      <h2>Order Status Update</h2>
      <p>Your order status has been updated.</p>
      <p>Order ID: <strong>${orderId}</strong></p>
      <p>Status: <strong>${status.toUpperCase()}</strong></p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};