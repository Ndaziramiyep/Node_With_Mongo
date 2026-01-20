import { Response } from 'express';
import { AuthRequest } from '../middlewares/adminAuth';
import User from '../models/User';
import Order from '../models/Order';
import { sendOrderStatusEmail } from '../services/emailService';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password -resetToken -resetTokenExpiry');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { role, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, email },
      { new: true }
    ).select('-password -resetToken -resetTokenExpiry');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;
    
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('user');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Send order status email
    const user = order.user as any;
    if (user && user.email) {
      try {
        await sendOrderStatusEmail(user.email, order._id.toString(), status);
      } catch (emailError) {
        console.error('Failed to send order status email:', emailError);
      }
    }
    
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
