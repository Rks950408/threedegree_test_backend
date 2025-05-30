const Gallery = require('../models/gallery.model');
const fs = require('fs');
const path = require('path');

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res) => {
  try {
    const { title, description, order, tags } = req.body;
    
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    // Create a new gallery item
    const galleryItem = await Gallery.create({
      title,
      description,
      imagePath: `/uploads/gallery/${req.file.filename}`,
      order: order || 0,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    res.status(201).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res) => {
  try {
    let galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    // If image is uploaded, update the imagePath
    if (req.file) {
      // Delete old image
      const oldImagePath = path.join(__dirname, '../..', galleryItem.imagePath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      
      // Update imagePath
      req.body.imagePath = `/uploads/gallery/${req.file.filename}`;
    }

    // Convert tags string to array if provided
    if (req.body.tags) {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    // Update gallery item
    galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    // Delete image from filesystem
    const imagePath = path.join(__dirname, '../..', galleryItem.imagePath);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete the gallery item
    await galleryItem.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
}; 