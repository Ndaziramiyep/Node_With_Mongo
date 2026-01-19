"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const User_1 = __importStar(require("./models/User"));
dotenv_1.default.config();
const createAdmin = async () => {
    try {
        await (0, database_1.connectDB)();
        const existingUser = await User_1.default.findOne({ email: 'patrickndaziramiye03@gmail.com' });
        if (existingUser) {
            console.log('Admin user already exists');
            process.exit(0);
        }
        const admin = await User_1.default.create({
            email: 'patrickndaziramiye03@gmail.com',
            password: '1234',
            role: User_1.UserRole.ADMIN
        });
        console.log('Admin user created successfully:', {
            id: admin._id,
            email: admin.email,
            role: admin.role
        });
        process.exit(0);
    }
    catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};
createAdmin();
