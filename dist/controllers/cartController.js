"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeItem = exports.updateItem = exports.addItem = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = async (req, res) => {
    try {
        let cart = await Cart_1.default.findOne({ userId: req.userId });
        if (!cart) {
            cart = await Cart_1.default.create({ userId: req.userId, items: [] });
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
        if (!product || !quantity || quantity < 1) {
            return res.status(400).json({ error: 'Valid product and quantity required' });
        }
        let cart = await Cart_1.default.findOne({ userId: req.userId });
        if (!cart) {
            cart = await Cart_1.default.create({ userId: req.userId, items: [{ product, quantity }] });
        }
        else {
            const existingItem = cart.items.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                cart.items.push({ product, quantity });
            }
            await cart.save();
        }
        res.status(201).json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
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
        const cart = await Cart_1.default.findOne({ userId: req.userId });
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
        const cart = await Cart_1.default.findOne({ userId: req.userId });
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
        const cart = await Cart_1.default.findOneAndDelete({ userId: req.userId });
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
