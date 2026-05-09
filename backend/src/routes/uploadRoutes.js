const express = require('express');
const router = express.Router();
const { adminProtect } = require('../middleware/adminAuth');
const { upload, processImage } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimits');

/**
 * @route   POST /api/team/upload-image
 * @desc    Upload and compress a team member profile image
 * @access  Private (Admin)
 * @returns { imagePath: '/uploads/team/filename.webp' }
 */
router.post(
  '/upload-image',
  uploadLimiter,
  adminProtect,
  upload.single('image'),
  processImage,
  (req, res) => {
    res.status(201).json({
      success: true,
      imagePath: req.processedImagePath,
    });
  }
);

module.exports = router;
