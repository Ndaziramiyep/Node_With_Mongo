import { Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { UserRole } from '../models/User';

const router = Router();

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
router.post('/', authenticate, authorize(UserRole.CUSTOMER), createOrder);

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
router.get('/', authenticate, authorize(UserRole.CUSTOMER), getOrders);

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
router.get('/:id', authenticate, authorize(UserRole.CUSTOMER), getOrderById);

export default router;