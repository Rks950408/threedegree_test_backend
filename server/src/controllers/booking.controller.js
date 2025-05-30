const Booking = require('../models/booking.model');
const emailService = require('../services/email.service');

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get bookings by email
exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email'
      });
    }
    
    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Manually send confirmation email for a booking
exports.resendConfirmationEmail = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Send confirmation email
    const emailResult = await emailService.sendBookingConfirmationEmail(booking);
    
    if (emailResult.success) {
      booking.emailSent = true;
      await booking.save();
      
      res.status(200).json({
        success: true,
        message: 'Confirmation email sent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send confirmation email'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Manually send admin notification for a booking
exports.sendAdminNotification = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Send admin notification
    const emailResult = await emailService.sendAdminNotificationEmail(booking);
    
    if (emailResult.success) {
      booking.adminNotified = true;
      await booking.save();
      
      res.status(200).json({
        success: true,
        message: 'Admin notification sent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send admin notification'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a payment status'
      });
    }
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    booking.paymentStatus = paymentStatus;
    await booking.save();
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 