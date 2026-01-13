"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.updateCart = exports.createCart = exports.getCart = exports.getAllCarts = void 0;
const uuid_1 = require("uuid");
const Cart_1 = __importDefault(require("../models/Cart"));
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart_1.default.find();
        res.json(carts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
};
exports.getAllCarts = getAllCarts;
const getCart = async (req, res) => {
    try {
        const cart = await Cart_1.default.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};
exports.getCart = getCart;
const createCart = async (req, res) => {
    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items array is required' });
        }
        const userId = (0, uuid_1.v4)();
        const itemsWithIds = items.map((item) => ({
            id: item.id || (0, uuid_1.v4)(),
            product: item.product,
            quantity: item.quantity
        }));
        const cart = new Cart_1.default({ userId, items: itemsWithIds });
        await cart.save();
        res.status(201).json(cart);
    }
    catch (error) {
        console.error('Create cart error:', error);
        res.status(500).json({ error: 'Failed to create cart' });
    }
};
exports.createCart = createCart;
const updateCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { items } = req.body;
        const cart = await Cart_1.default.findOneAndUpdate({ userId }, { items }, { new: true });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
};
exports.updateCart = updateCart;
const deleteCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart_1.default.findOneAndDelete({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete cart' });
    }
};
exports.deleteCart = deleteCart;
