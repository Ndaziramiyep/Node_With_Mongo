"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.userRole) {
            return res.status(403).json({ error: 'No role assigned. Contact admin for role assignment.' });
        }
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};
exports.authorize = authorize;
