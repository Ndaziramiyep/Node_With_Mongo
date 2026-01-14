import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';
import Cart from '../models/Cart';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = await Cart.create({ userId: req.userId, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const { product, quantity } = req.body;
    
    if (!product || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid product and quantity required' });
    }
    
    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.userId, items: [{ product, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.product === product);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
      await cart.save();
    }
    
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity required' });
    }
    
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item._id?.toString() === id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    item.quantity = quantity;
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item._id?.toString() !== id);
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};