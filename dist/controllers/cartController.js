"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeItem = exports.updateItem = exports.addItem = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const getCart = async (req, res) => {
    try {
        let cart = await Cart_1.default.findOne({ user: req.userId }).populate('items.product');
        if (!cart) {
            cart = await Cart_1.default.create({ user: req.userId, items: [] });
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};
exports.getCart = getCart;
const addItem = async (req, res) => {
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
            const foundProduct = await Product_1.default.findOne({
                name: { $regex: new RegExp(product, 'i') }
            });
            if (!foundProduct) {
                return res.status(404).json({ error: `Product '${product}' not found` });
            }
            productId = foundProduct._id;
        }
        else {
            // Verify ObjectId exists
            const foundProduct = await Product_1.default.findById(product);
            if (!foundProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
        }
        let cart = await Cart_1.default.findOne({ user: req.userId });
        if (!cart) {
            cart = await Cart_1.default.create({ user: req.userId, items: [{ product: productId, quantity }] });
        }
        else {
            const existingItem = cart.items.find(item => item.product.toString() === productId.toString());
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();
        }
        const populatedCart = await Cart_1.default.findById(cart._id).populate('items.product');
        res.status(201).json(populatedCart);
    }
    catch (error) {
        console.error('Add item error:', error);
        res.status(500).json({ error: 'Failed to add item', details: error.message });
    }
};
exports.addItem = addItem;
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: 'Valid quantity required' });
        }
        const cart = await Cart_1.default.findOne({ user: req.userId });
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
};
exports.updateItem = updateItem;
const removeItem = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart_1.default.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item._id?.toString() !== id);
        await cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove item' });
    }
};
exports.removeItem = removeItem;
const clearCart = async (req, res) => {
    try {
        const cart = await Cart_1.default.findOneAndUpdate({ user: req.userId }, { items: [] });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ message: 'Cart cleared successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to clear cart' });
    }
};
exports.clearCart = clearCart;
