const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    imagePath: {
      type: String,
      required: [true, 'Please provide an image path'],
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    duration: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    included: {
      type: [String],
      default: [],
    },
    notIncluded: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate a slug from title
travelSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Travel', travelSchema); 