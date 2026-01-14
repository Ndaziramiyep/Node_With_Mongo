import { Router } from 'express';
import { getCart, addItem, updateItem, removeItem, clearCart } from '../controllers/cartController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/', authenticate, getCart);
router.post('/items', authenticate, addItem);
router.put('/items/:id', authenticate, updateItem);
router.delete('/items/:id', authenticate, removeItem);
router.delete('/', authenticate, clearCart);

export default router;