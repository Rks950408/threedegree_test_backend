const express = require('express');
const {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/gallery.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/gallery');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `gallery-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow only images
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  },
});

const router = express.Router();

// Public routes
router.get('/', getGalleryItems);
router.get('/:id', getGalleryItem);

// Admin routes
router.post('/', protect, admin, upload.single('image'), createGalleryItem);
router.put('/:id', protect, admin, upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router; 