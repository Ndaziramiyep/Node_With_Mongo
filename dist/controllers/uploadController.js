"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductImage = exports.uploadProductImages = exports.uploadProfileImage = void 0;
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const upload_1 = require("../config/upload");
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const user = await User_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.profileImage) {
            (0, upload_1.deleteFile)(user.profileImage);
        }
        user.profileImage = req.file.path;
        await user.save();
        res.json({ message: 'Profile image uploaded', profileImage: user.profileImage });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to upload profile image' });
    }
};
exports.uploadProfileImage = uploadProfileImage;
const uploadProductImages = async (req, res) => {
    try {
        const { productId } = req.params;
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const imagePaths = files.map(file => file.path);
        product.images = [...(product.images || []), ...imagePaths];
        await product.save();
        res.json({ message: 'Product images uploaded', images: product.images });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to upload product images' });
    }
};
exports.uploadProductImages = uploadProductImages;
const deleteProductImage = async (req, res) => {
    try {
        const { productId, imageIndex } = req.params;
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const index = parseInt(imageIndex);
        if (!product.images || index < 0 || index >= product.images.length) {
            return res.status(400).json({ error: 'Invalid image index' });
        }
        const imagePath = product.images[index];
        (0, upload_1.deleteFile)(imagePath);
        product.images.splice(index, 1);
        await product.save();
        res.json({ message: 'Product image deleted', images: product.images });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete product image' });
    }
};
exports.deleteProductImage = deleteProductImage;
