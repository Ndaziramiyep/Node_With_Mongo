import { Router } from 'express';
import { getProfile, changePassword, logout } from '../controllers/users.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.post('/change-password', authenticate, changePassword);
router.post('/logout', authenticate, logout);

export default router;
