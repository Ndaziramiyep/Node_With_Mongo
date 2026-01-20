"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../config/upload");
const authenticate_1 = require("../middlewares/authenticate");
const uploadController_1 = require("../controllers/uploadController");
const router = (0, express_1.Router)();
// Handle multer errors
const handleUploadError = (err, req, res, next) => {
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
router.post('/profile', authenticate_1.authenticate, upload_1.upload.single('profileImage'), handleUploadError, uploadController_1.uploadProfileImage);
router.post('/products/:productId', authenticate_1.authenticate, upload_1.upload.array('productImages', 5), handleUploadError, uploadController_1.uploadProductImages);
router.delete('/products/:productId/images/:imageIndex', authenticate_1.authenticate, uploadController_1.deleteProductImage);
exports.default = router;
