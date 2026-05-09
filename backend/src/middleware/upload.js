const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../../uploads/team');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Store files in memory first so sharp can process them
const storage = multer.memoryStorage();

// File filter — only allow images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, png, webp, gif) are allowed'), false);
  }
};

// Multer instance — max 5MB before sharp compression
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,
  },
});

/**
 * Sharp image processing middleware.
 * Compresses uploaded image to WebP, max 800px wide, quality 80.
 * Attaches `req.processedImagePath` with the relative path.
 */
const processImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  // Generate a unique filename
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
  const filename = `team-${uniqueSuffix}.webp`;
  const outputPath = path.join(uploadDir, filename);

  await sharp(req.file.buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  // Attach the relative URL path for storage in DB
  req.processedImagePath = `/uploads/team/${filename}`;
  next();
});

module.exports = { upload, processImage };
