const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get single booking by ID
router.get('/:id', bookingController.getBookingById);

// Get bookings by email
router.post('/by-email', bookingController.getBookingsByEmail);

// Resend confirmation email
router.post('/:id/resend-confirmation', bookingController.resendConfirmationEmail);

// Send admin notification
router.post('/:id/admin-notification', bookingController.sendAdminNotification);

// Update booking status
router.patch('/:id/status', bookingController.updateBookingStatus);

module.exports = router; 