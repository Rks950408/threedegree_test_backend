const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide customer email'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    mobile: {
      type: String,
      required: [true, 'Please provide mobile number'],
      trim: true
    },
    accommodations: {
      type: Object,
      required: true
    },
    specialRequirements: {
      type: String,
      trim: true
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentId: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['succeeded', 'processing', 'failed'],
      default: 'processing'
    },
    bookingDate: {
      type: Date,
      default: Date.now
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    sessionId: {
      type: String
    },
    emailSent: {
      type: Boolean,
      default: false
    },
    adminNotified: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema); 