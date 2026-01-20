"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.deleteUser = exports.updateUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const emailService_1 = require("../services/emailService");
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password -resetToken -resetTokenExpiry');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res) => {
    try {
        const { role, email } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.params.id, { role, email }, { new: true }).select('-password -resetToken -resetTokenExpiry');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params;
        const order = await Order_1.default.findByIdAndUpdate(orderId, { status }, { new: true }).populate('user');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        // Send order status email
        const user = order.user;
        if (user && user.email) {
            try {
                await (0, emailService_1.sendOrderStatusEmail)(user.email, order._id.toString(), status);
            }
            catch (emailError) {
                console.error('Failed to send order status email:', emailError);
            }
        }
        res.json({ message: 'Order status updated', order });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};
exports.updateOrderStatus = updateOrderStatus;
