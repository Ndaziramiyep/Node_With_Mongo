"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Cart_1 = __importDefault(require("../models/Cart"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cleanupCarts = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/node_mongo_db');
        // Remove carts with null or invalid user references
        const result = await Cart_1.default.deleteMany({
            $or: [
                { user: null },
                { user: { $exists: false } },
                { userId: null },
                { userId: { $exists: true } }
            ]
        });
        console.log(`Cleaned up ${result.deletedCount} invalid cart entries`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error cleaning up carts:', error);
        process.exit(1);
    }
};
cleanupCarts();
