"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cleanupCarts = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nodedb');
        // Remove carts with null or undefined userId
        const result = await mongoose_1.default.connection.db.collection('carts').deleteMany({
            $or: [
                { userId: null },
                { userId: { $exists: false } },
                { user: null },
                { user: { $exists: false } }
            ]
        });
        console.log(`Cleaned up ${result.deletedCount} invalid carts`);
        // Drop the problematic userId index if it exists
        try {
            await mongoose_1.default.connection.db.collection('carts').dropIndex('userId_1');
            console.log('Dropped userId_1 index');
        }
        catch (error) {
            console.log('userId_1 index does not exist or already dropped');
        }
        await mongoose_1.default.disconnect();
        console.log('Cleanup completed successfully');
    }
    catch (error) {
        console.error('Cleanup failed:', error);
        process.exit(1);
    }
};
cleanupCarts();
