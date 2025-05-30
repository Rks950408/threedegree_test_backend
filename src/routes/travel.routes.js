const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/travel');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `travel-${Date.now()}${path.extname(file.originalname)}`
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
router.get('/', (req, res) => {
  res.json({ message: 'Get all travel packages - To be implemented' });
});
router.get('/:id', (req, res) => {
  res.json({ message: 'Get travel by ID - To be implemented' });
});

// Admin routes
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.json({ message: 'Create travel package - To be implemented' });
});
router.put('/:id', protect, admin, upload.single('image'), (req, res) => {
  res.json({ message: 'Update travel package - To be implemented' });
});
router.delete('/:id', protect, admin, (req, res) => {
  res.json({ message: 'Delete travel package - To be implemented' });
});

module.exports = router; 