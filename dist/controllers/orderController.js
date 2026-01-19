"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;
        const cart = await Cart_1.default.findOne({ userId: req.userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        const orderItems = cart.items.map(item => {
            const product = item.product;
            return {
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            };
        });
        const totalAmount = cart.items.reduce((total, item) => {
            const product = item.product;
            return total + (product.price * item.quantity);
        }, 0);
        const order = await Order_1.default.create({
            user: req.userId,
            items: orderItems,
            totalAmount,
            shippingAddress
        });
        await Cart_1.default.findOneAndUpdate({ userId: req.userId }, { items: [] });
        res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create order' });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find({ user: req.userId }).populate('items.product');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await Order_1.default.findOne({
            _id: req.params.id,
            user: req.userId
        }).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};
exports.getOrderById = getOrderById;
