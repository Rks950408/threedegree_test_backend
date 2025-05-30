// Test email functionality
const dotenv = require('dotenv');
const path = require('path');
const emailService = require('./src/services/email.service');

// Load environment variables
dotenv.config({ path: '../.env' });

async function testEmail() {
  console.log('SMTP Settings:');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('Secure:', process.env.SMTP_SECURE);
  console.log('User:', process.env.SMTP_USER);
  console.log('From:', process.env.EMAIL_FROM);
  console.log('Admin Emails:', process.env.ADMIN_EMAILS);

  console.log('\nInitializing email transporter...');
  await emailService.initializeTransporter();

  // Create a mock booking for testing
  const mockBooking = {
    fullName: 'Test User',
    email: 'spnsarkar103@gmail.com', // Your email for testing
    mobile: '07522553830',
    accommodations: {
      single: { selected: true, quantity: 1 },
      double: { selected: false, quantity: 0 }
    },
    specialRequirements: 'This is a test booking',
    totalAmount: 900,
    paymentId: 'pi_test_12345678',
    paymentStatus: 'succeeded',
    bookingDate: new Date(),
    _id: 'test123'
  };

  console.log('\nSending customer confirmation email...');
  const customerResult = await emailService.sendBookingConfirmationEmail(mockBooking);
  console.log('Customer email result:', customerResult);

  console.log('\nSending admin notification email...');
  const adminResult = await emailService.sendAdminNotificationEmail(mockBooking);
  console.log('Admin email result:', adminResult);
}

testEmail().catch(error => {
  console.error('Error in test:', error);
}); 