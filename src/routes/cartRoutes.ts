import { Router } from 'express';
import {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart
} from '../controllers/cartController';

const router = Router();

router.get('/', getAllCarts);
router.post('/', createCart);
router.get('/:userId', getCart);
router.put('/:userId', updateCart);
router.delete('/:userId', deleteCart);

export default router;