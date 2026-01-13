"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
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
        const product = new Product_1.default({
            name,
            price,
            description,
            category,
            inStock: inStock !== undefined ? inStock : true,
            quantity
        });
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({ error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, inStock, quantity } = req.body;
        if (price < 0) {
            return res.status(400).json({ error: 'Price cannot be negative' });
        }
        if (quantity < 0) {
            return res.status(400).json({ error: 'Quantity cannot be negative' });
        }
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, { name, price, description, category, inStock, quantity }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
exports.deleteProduct = deleteProduct;
