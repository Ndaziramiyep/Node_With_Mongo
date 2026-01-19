"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authenticate_1 = require("../middlewares/authenticate");
const requireAdmin_1 = require("../middlewares/requireAdmin");
const router = (0, express_1.Router)();
// All admin routes require authentication and admin privileges
router.use(authenticate_1.authenticate);
router.use(requireAdmin_1.requireAdmin);
router.get('/users', adminController_1.getAllUsers);
router.put('/users/:userId/role', adminController_1.updateUserRole);
router.patch('/users/:userId/toggle-status', adminController_1.toggleUserStatus);
router.delete('/users/:userId', adminController_1.deleteUser);
exports.default = router;
