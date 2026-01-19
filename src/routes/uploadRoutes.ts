import { Router } from 'express';
import { upload } from '../config/upload';
import { authenticate } from '../middlewares/authenticate';
import { uploadProfileImage, uploadProductImages, deleteProductImage } from '../controllers/uploadController';

const router = Router();

router.post('/profile', authenticate, upload.single('profileImage'), uploadProfileImage);
router.post('/products/:productId', authenticate, upload.array('productImages', 5), uploadProductImages);
router.delete('/products/:productId/images/:imageIndex', authenticate, deleteProductImage);

export default router;