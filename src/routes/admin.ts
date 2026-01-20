import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser, updateOrderStatus } from '../controllers/admin.controller';
import { adminAuth } from '../middlewares/adminAuth';
import { authorize } from '../middlewares/authorize';
import { UserRole } from '../models/User';

const router = Router();

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get('/users', adminAuth, authorize(UserRole.ADMIN), getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update user (Admin only)
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
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, vendor, customer]
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put('/users/:id', adminAuth, authorize(UserRole.ADMIN), updateUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete user (Admin only)
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
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', adminAuth, authorize(UserRole.ADMIN), deleteUser);

router.put('/orders/:orderId/status', adminAuth, authorize(UserRole.ADMIN), updateOrderStatus);

export default router;
