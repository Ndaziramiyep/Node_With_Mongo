import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.userId, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const { product, quantity } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ error: 'User authentication required' });
    }
    
    if (!product || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid product and quantity required' });
    }
    
    let productId = product;
    
    // If product is not a valid ObjectId, try to find by name
    if (!/^[0-9a-fA-F]{24}$/.test(product)) {
      const foundProduct = await Product.findOne({ 
        name: { $regex: new RegExp(product, 'i') } 
      });
      if (!foundProduct) {
        return res.status(404).json({ error: `Product '${product}' not found` });
      }
      productId = foundProduct._id;
    } else {
      // Verify ObjectId exists
      const foundProduct = await Product.findById(product);
      if (!foundProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
    }
    
    let cart = await Cart.findOne({ user: req.userId });
    
    if (!cart) {
      cart = await Cart.create({ user: req.userId, items: [{ product: productId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId.toString());
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }
    
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(201).json(populatedCart);
  } catch (error) {
    console.error('Add item error:', error);
    res.status(500).json({ error: 'Failed to add item', details: (error as Error).message });
  }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity required' });
    }
    
    const cart = await Cart.findOne({ user: req.userId });
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
    
    const cart = await Cart.findOne({ user: req.userId });
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
    const cart = await Cart.findOneAndUpdate({ user: req.userId }, { items: [] });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};