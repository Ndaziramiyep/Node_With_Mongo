import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';
import User from '../models/User';
import Product from '../models/Product';
import { deleteFile } from '../config/upload';

export const uploadProfileImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      deleteFile(req.file.path);
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.profileImage) {
      deleteFile(user.profileImage);
    }

    user.profileImage = req.file.path;
    await user.save();

    res.json({ message: 'Profile image uploaded', profileImage: user.profileImage });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
};

export const uploadProductImages = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      files.forEach(file => deleteFile(file.path));
      return res.status(404).json({ error: 'Product not found' });
    }

    const imagePaths = files.map(file => file.path);
    product.images = [...(product.images || []), ...imagePaths];
    await product.save();

    res.json({ message: 'Product images uploaded', images: product.images });
  } catch (error) {
    if (req.files) {
      (req.files as Express.Multer.File[]).forEach(file => deleteFile(file.path));
    }
    res.status(500).json({ error: 'Failed to upload product images' });
  }
};

export const deleteProductImage = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, imageIndex } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const index = parseInt(imageIndex);
    if (!product.images || index < 0 || index >= product.images.length) {
      return res.status(400).json({ error: 'Invalid image index' });
    }

    const imagePath = product.images[index];
    deleteFile(imagePath);
    product.images.splice(index, 1);
    await product.save();

    res.json({ message: 'Product image deleted', images: product.images });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product image' });
  }
};