import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';
import Order, { OrderStatus } from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import User from '../models/User';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { shippingAddress } = req.body;
    
    let finalShippingAddress = shippingAddress;
    
    if (!finalShippingAddress) {
      const user = await User.findById(req.userId);
      if (!user?.shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
      }
      finalShippingAddress = user.shippingAddress;
    }
    
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => {
      const product = item.product as any;
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      };
    });

    const totalAmount = cart.items.reduce((total, item) => {
      const product = item.product as any;
      return total + (product.price * item.quantity);
    }, 0);

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      totalAmount,
      shippingAddress: finalShippingAddress
    });

    await Cart.findOneAndUpdate({ user: req.userId }, { items: [] });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.userId 
    }).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};