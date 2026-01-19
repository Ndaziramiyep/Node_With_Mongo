"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get user cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate_1.authenticate, cartController_1.getCart);
/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product name or ObjectId
 *                 example: "Phone Samsung Galaxy A70"
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Invalid input
 */
router.post('/items', authenticate_1.authenticate, cartController_1.addItem);
/**
 * @swagger
 * /api/cart/items/{id}:
 *   put:
 *     tags: [Cart]
 *     summary: Update cart item quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */
router.put('/items/:id', authenticate_1.authenticate, cartController_1.updateItem);
/**
 * @swagger
 * /api/cart/items/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
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
 *         description: Item removed
 *       404:
 *         description: Item not found
 */
router.delete('/items/:id', authenticate_1.authenticate, cartController_1.removeItem);
/**
 * @swagger
 * /api/cart:
 *   delete:
 *     tags: [Cart]
 *     summary: Clear entire cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 *       404:
 *         description: Cart not found
 */
router.delete('/', authenticate_1.authenticate, cartController_1.clearCart);
exports.default = router;
