"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const emailService_1 = require("../services/emailService");
dotenv_1.default.config();
const testEmailConfig = async () => {
    console.log('Testing email configuration...');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
    try {
        await (0, emailService_1.sendWelcomeEmail)('test@example.com');
        console.log('✅ Email test successful');
    }
    catch (error) {
        console.error('❌ Email test failed:', error);
    }
};
testEmailConfig();
