"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const emailService_1 = require("../services/emailService");
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User_1.default.create({ email, password });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        // Send welcome email
        try {
            await (0, emailService_1.sendWelcomeEmail)(email);
        }
        catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
        }
        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is deactivated' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 3600000);
        await user.save();
        // Send password reset email
        try {
            await (0, emailService_1.sendPasswordResetEmail)(email, resetToken);
        }
        catch (emailError) {
            console.error('Failed to send reset email:', emailError);
        }
        res.json({ message: 'Reset token generated and email sent' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to process request' });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        const user = await User_1.default.findOne({
            resetToken,
            resetTokenExpiry: { $gt: new Date() }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        res.json({ message: 'Password reset successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to reset password' });
    }
};
exports.resetPassword = resetPassword;
