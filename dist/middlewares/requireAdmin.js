"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const User_1 = require("../models/User");
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.user.role !== User_1.UserRole.ADMIN) {
        return res.status(403).json({ error: 'Admin privileges required' });
    }
    if (!req.user.isActive) {
        return res.status(403).json({ error: 'Account is deactivated' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
