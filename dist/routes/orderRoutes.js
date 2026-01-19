"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create order from cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 description: Optional - uses saved address from profile if not provided
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Cart is empty or shipping address required
 */
router.post('/', authenticate_1.authenticate, orderController_1.createOrder);
/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get user orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get('/', authenticate_1.authenticate, orderController_1.getOrders);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get('/:id', authenticate_1.authenticate, orderController_1.getOrderById);
exports.default = router;
