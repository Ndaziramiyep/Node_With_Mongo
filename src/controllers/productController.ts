import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;
    
    // Check required fields
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
      quantity
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;
    
    if (price < 0) {
      return res.status(400).json({ error: 'Price cannot be negative' });
    }
    
    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, inStock, quantity },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};