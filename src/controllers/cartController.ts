import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Cart from '../models/Cart';

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carts' });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required' });
    }
    
    const userId = uuidv4();
    
    const itemsWithIds = items.map((item: any) => ({
      product: item.product,
      quantity: item.quantity
    }));
    
    const cart = new Cart({ userId, items: itemsWithIds });
    await cart.save();
    res.status(201).json(cart);
  } catch (error: any) {
    console.error('Create cart error:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;
    
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true }
    );
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};