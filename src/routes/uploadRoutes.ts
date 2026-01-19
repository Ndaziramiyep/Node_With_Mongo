import { Router } from 'express';
import { upload } from '../config/upload';
import { authenticate } from '../middlewares/authenticate';
import { uploadProfileImage, uploadProductImages, deleteProductImage } from '../controllers/uploadController';

const router = Router();

// Handle multer errors
const handleUploadError = (err: any, req: any, res: any, next: any) => {
  if (err instanceof Error) {
    if (err.message.includes('File too large')) {
      return res.status(400).json({ error: 'File size exceeds 1MB limit' });
    }
    if (err.message.includes('Invalid file')) {
      return res.status(400).json({ error: err.message });
    }
  }
  return res.status(400).json({ error: 'File upload failed' });
};

router.post('/profile', authenticate, upload.single('profileImage'), handleUploadError, uploadProfileImage);
router.post('/products/:productId', authenticate, upload.array('productImages', 5), handleUploadError, uploadProductImages);
router.delete('/products/:productId/images/:imageIndex', authenticate, deleteProductImage);

export default router;