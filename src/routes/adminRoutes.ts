import { Router } from 'express';
import {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser
} from '../controllers/adminController';
import { authenticate } from '../middlewares/authenticate';
import { requireAdmin } from '../middlewares/requireAdmin';

const router = Router();

// All admin routes require authentication and admin privileges
router.use(authenticate);
router.use(requireAdmin);

router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRole);
router.patch('/users/:userId/toggle-status', toggleUserStatus);
router.delete('/users/:userId', deleteUser);

export default router;