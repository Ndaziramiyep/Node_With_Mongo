"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmail = void 0;
const emailService_1 = require("../services/emailService");
const testEmail = async () => {
    try {
        await (0, emailService_1.sendWelcomeEmail)('test@example.com');
        console.log('Test email sent successfully');
    }
    catch (error) {
        console.error('Test email failed:', error);
    }
};
exports.testEmail = testEmail;
// Uncomment to test email functionality
// testEmail();
