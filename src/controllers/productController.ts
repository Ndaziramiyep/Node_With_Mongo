import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';
import Product from '../models/Product';
import { UserRole } from '../models/User';

export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }
    
    if (price === undefined || price === null) {
      return res.status(400).json({ error: 'Price is required' });
    }
    
    if (quantity === undefined || quantity === null) {
      return res.status(400).json({ error: 'Quantity is required' });
    }
    
    if (price < 0) {
      return res.status(400).json({ error: 'Price cannot be negative' });
    }
    
    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }
    
    const product = new Product({
      name,
      price,
      description,
      category,
      inStock: inStock !== undefined ? inStock : true,
      quantity,
      vendorId: req.userId
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;
    
    if (price < 0) {
      return res.status(400).json({ error: 'Price cannot be negative' });
    }
    
    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Vendors can only update their own products
    if (req.userRole === UserRole.VENDOR && product.vendorId !== req.userId) {
      return res.status(403).json({ error: 'You can only update your own products' });
    }
    
    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description !== undefined ? description : product.description;
    product.category = category || product.category;
    product.inStock = inStock !== undefined ? inStock : product.inStock;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Vendors can only delete their own products
    if (req.userRole === UserRole.VENDOR && product.vendorId !== req.userId) {
      return res.status(403).json({ error: 'You can only delete your own products' });
    }
    
    // Delete associated images
    if (product.images && product.images.length > 0) {
      const { deleteFile } = await import('../config/upload');
      product.images.forEach(imagePath => deleteFile(imagePath));
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};