const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

// Create a transporter for sending emails
// For production, you'll want to use a service like SendGrid, Mailgun, etc.
// For development/testing, we can use a test account from Ethereal
let transporter = null;

// Initialize the email transporter
const initializeTransporter = async () => {
  // If SMTP settings are provided in env, use them
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('Email transporter initialized with provided SMTP settings');
  } else {
    // Otherwise, create a test account on Ethereal for development
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('Email transporter initialized with Ethereal test account');
      console.log('Email preview URL will be provided in console');
    } catch (error) {
      console.error('Failed to create test email account:', error);
    }
  }
};

// Function to send an email
const sendEmail = async (options) => {
  if (!transporter) {
    await initializeTransporter();
  }

  try {
    const mailOptions = {
      from: `"Three Degrees East" <${process.env.EMAIL_FROM || 'namaste@threedegreeseast.com'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    if (info.messageId) {
      console.log('Email sent: %s', info.messageId);
      
      // If using Ethereal, provide preview URL
      if (info.preview) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
      
      return { success: true, messageId: info.messageId };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Customer Booking Confirmation Email
const sendBookingConfirmationEmail = async (booking) => {
  // Format date nicely for the email
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format accommodations for display
  let accommodationsHtml = '';
  let accommodationsText = '';
  
  Object.entries(booking.accommodations).forEach(([id, details]) => {
    if (details.selected && details.quantity > 0) {
      const option = id === 'single' 
        ? { name: 'Single Occupancy', price: 900 }
        : { name: 'Double Occupancy', price: 1100 };
      
      accommodationsHtml += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${option.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${details.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">£${option.price * details.quantity}</td>
        </tr>
      `;
      
      accommodationsText += `${option.name} x ${details.quantity}: £${option.price * details.quantity}\n`;
    }
  });
  
  // Build the HTML email
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #C47E5A; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; background-color: #FEF8F2; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 10px; border-bottom: 2px solid #ddd; }
        .booking-ref { background-color: #f5f5f5; padding: 10px; text-align: center; margin: 20px 0; }
        .total { font-weight: bold; margin-top: 20px; text-align: right; }
        .button { display: inline-block; background-color: #C47E5A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${booking.fullName},</p>
          <p>Thank you for your booking with Three Degrees East. We're excited to have you join us!</p>
          
          <div class="booking-ref">
            <p><strong>Booking Reference:</strong> ${booking.paymentId.substring(0, 8).toUpperCase()}</p>
            <p><strong>Date:</strong> ${bookingDate}</p>
          </div>
          
          <h3>Your Booking Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Accommodation</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${accommodationsHtml}
            </tbody>
          </table>
          
          <p class="total">Total Amount: £${booking.totalAmount}</p>
          
          ${booking.specialRequirements ? 
            `<h3>Special Requirements:</h3>
             <p>${booking.specialRequirements}</p>` : ''}
          
          <h3>What's Next?</h3>
          <p>We'll be in touch approximately 3 weeks before the retreat with additional information about the venue, schedule, and what to bring.</p>
          
          <p>If you have any questions in the meantime, please don't hesitate to contact us at <a href="mailto:namaste@threedegreeseast.com">namaste@threedegreeseast.com</a>.</p>
          
          <p>We look forward to sharing this transformative journey with you!</p>
          
          <p>Warm regards,<br>The Three Degrees East Team</p>
          
          <p><a href="${config.frontendUrl}" class="button">Visit Our Website</a></p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Three Degrees East. All rights reserved.</p>
          <p>This email was sent to ${booking.email}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Plain text version of the email
  const text = `
    Booking Confirmation
    ====================
    
    Dear ${booking.fullName},
    
    Thank you for your booking with Three Degrees East. We're excited to have you join us!
    
    Booking Reference: ${booking.paymentId.substring(0, 8).toUpperCase()}
    Date: ${bookingDate}
    
    Your Booking Details:
    --------------------
    ${accommodationsText}
    
    Total Amount: £${booking.totalAmount}
    
    ${booking.specialRequirements ? 
      `Special Requirements:
       ${booking.specialRequirements}` : ''}
    
    What's Next?
    -----------
    We'll be in touch approximately 3 weeks before the retreat with additional information about the venue, schedule, and what to bring.
    
    If you have any questions in the meantime, please don't hesitate to contact us at namaste@threedegreeseast.com.
    
    We look forward to sharing this transformative journey with you!
    
    Warm regards,
    The Three Degrees East Team
    
    © ${new Date().getFullYear()} Three Degrees East. All rights reserved.
    This email was sent to ${booking.email}.
  `;
  
  return sendEmail({
    to: booking.email,
    subject: 'Your Three Degrees East Booking Confirmation',
    html,
    text
  });
};

// Admin Notification Email
const sendAdminNotificationEmail = async (booking) => {
  // Format date for email
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Admin email addresses (could be defined in .env)
  const adminEmails = process.env.ADMIN_EMAILS || 'namaste@threedegreeseast.com';
  
  // Build the HTML email
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #C47E5A; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; background-color: #FEF8F2; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 10px; border-bottom: 2px solid #ddd; }
        .booking-details { margin-bottom: 20px; }
        .booking-details p { margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Alert</h1>
        </div>
        <div class="content">
          <p>A new booking has been received on Three Degrees East.</p>
          
          <div class="booking-details">
            <h3>Booking Information:</h3>
            <p><strong>Reference:</strong> ${booking.paymentId.substring(0, 8).toUpperCase()}</p>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Customer:</strong> ${booking.fullName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.mobile}</p>
            <p><strong>Amount:</strong> £${booking.totalAmount}</p>
            <p><strong>Payment Status:</strong> Paid</p>
          </div>
          
          <h3>Accommodation Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(booking.accommodations).map(([id, details]) => {
                if (details.selected && details.quantity > 0) {
                  const option = id === 'single' 
                    ? { name: 'Single Occupancy', price: 900 }
                    : { name: 'Double Occupancy', price: 1100 };
                  
                  return `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${option.name}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${details.quantity}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">£${option.price * details.quantity}</td>
                    </tr>
                  `;
                }
                return '';
              }).join('')}
            </tbody>
          </table>
          
          ${booking.specialRequirements ? 
            `<h3>Special Requirements:</h3>
             <p>${booking.specialRequirements}</p>` : ''}
          
          <p>You can view this booking in the admin dashboard.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Three Degrees East. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Plain text version of the email
  const text = `
    New Booking Alert
    ================
    
    A new booking has been received on Three Degrees East.
    
    Booking Information:
    -------------------
    Reference: ${booking.paymentId.substring(0, 8).toUpperCase()}
    Date: ${bookingDate}
    Customer: ${booking.fullName}
    Email: ${booking.email}
    Phone: ${booking.mobile}
    Amount: £${booking.totalAmount}
    Payment Status: Paid
    
    ${booking.specialRequirements ? 
      `Special Requirements:
       ${booking.specialRequirements}` : ''}
    
    You can view this booking in the admin dashboard.
  `;
  
  return sendEmail({
    to: adminEmails,
    subject: 'New Booking Notification - Three Degrees East',
    html,
    text
  });
};

module.exports = {
  initializeTransporter,
  sendEmail,
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail
}; 