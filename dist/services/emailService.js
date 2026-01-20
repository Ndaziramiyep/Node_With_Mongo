"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderStatusEmail = exports.sendOrderPlacedEmail = exports.sendPasswordChangedEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendWelcomeEmail = async (email) => {
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
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetToken) => {
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
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendPasswordChangedEmail = async (email) => {
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
exports.sendPasswordChangedEmail = sendPasswordChangedEmail;
const sendOrderPlacedEmail = async (email, orderId) => {
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
exports.sendOrderPlacedEmail = sendOrderPlacedEmail;
const sendOrderStatusEmail = async (email, orderId, status) => {
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
exports.sendOrderStatusEmail = sendOrderStatusEmail;
