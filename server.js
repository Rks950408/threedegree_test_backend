// Load environment variables FIRST - before ANY imports
require("dotenv").config();

// Load environment variables from root directory
// try {
//   dotenv.config({ path: 'env' });
//   console.log('Loaded environment from ../.env');
// } catch (err) {
//   console.log('No .env file found in parent directory');
//   // Only try .env.local in root directory as fallback
//   try {
//     dotenv.config({ path: '../.env.local' });
//     console.log('Loaded environment from ../.env.local');
//   } catch (err) {
//     console.log('No environment files found');
//   }
// }

// Now import all other modules
const express = require('express');
// Only import mongoose if we need it later
// const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const stripe = require('stripe');

// Uncomment MongoDB imports and add Booking model
const mongoose = require('mongoose');
const Booking = require('./src/models/booking.model');
const emailService = require('./src/services/email.service');

// Debug environment variables
console.log('-------- Environment Variables --------');
console.log('VITE_STRIPE_SECRET_KEY:', process.env.VITE_STRIPE_SECRET_KEY ? 'Found (not showing for security)' : 'NOT FOUND');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found (not showing for security)' : 'NOT FOUND');
console.log('-------------------------------------');

// Load config AFTER environment variables are loaded
const config = require('./config');

// Debug configuration
console.log('-------- Payment Configuration --------');
console.log('Payment Mode:', config.paymentMode);
console.log('Using Real Payments:', config.useRealPayments);
console.log('Stripe Key Type:', config.stripeSecretKey?.startsWith('sk_test_') ? 'TEST KEY' : 'LIVE KEY');
console.log('API Base URL:', config.frontendUrl);
console.log('-------------------------------------');

// Initialize Express app
const app = express();

// Enhanced CORS configuration to fix mobile issues
const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS request from origin:', origin || 'no origin (likely localhost)');
    // Allow any origin
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// Middleware
app.use(cors(corsOptions));
console.log('Enhanced CORS configuration applied');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from public directory
const checkURL = path.join(__dirname, './public')
console.log(checkURL);
app.use(express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const galleryRoutes = require('./src/routes/gallery.routes');
const blogRoutes = require('./src/routes/blog.routes');
const travelRoutes = require('./src/routes/travel.routes');
const contentRoutes = require('./src/routes/content.routes');
const bookingRoutes = require('./src/routes/booking.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/bookings', bookingRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ThreeDegree API' });
});

// Simple ping endpoint for testing connectivity
app.get('/ping', (req, res) => {
  console.log('🔔 Ping received from:', req.headers['user-agent'] || 'unknown client');
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    time: new Date().toISOString(),
    mode: config.paymentMode,
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Create initial content.json if it doesn't exist
const contentFilePath = path.join(__dirname, './public/content.json');
if (!fs.existsSync(contentFilePath)) {
  const defaultContent = {
    popup: {
      title: "UPCOMING RETREAT",
      content: "Join us for a transformative experience in the heart of India.",
      image: "/images/gallery/shakti.png"
    },
    about: {
      title: "ABOUT US",
      paragraph1: "Three Degrees East was born from a shared desire to reconnect — with self, with nature, and with India's deep-rooted traditions. We create soulful journeys that honour the sacred and celebrate the simple.",
      paragraph2: "Led by women and guided by purpose, our retreats offer more than escape — they invite transformation. With every step, chant, or meal, we hold space for reflection, healing, and the joy of rediscovery."
    },
    travel: {
      title: "TRAVEL",
      paragraph1: "India isn't just a destination — it's a deep exhale for your soul. Beyond the postcard-perfect Taj Mahal and colourful clichés, this is where ancient wisdom meets modern awakening. From Himalayan sunrises that still the mind to temple bells that stir the heart, every corner invites you to slow down, breathe deeper, and reconnect.",
      paragraph2: "Here, wellness isn't a trend — it's a way of life passed down through centuries of yoga, Ayurveda, and spiritual practice. Come for the culture, stay for the transformation. India doesn't just change your view — it changes you."
    },
    hero: {
      image: "/images/gallery/1.jpg"
    },
    overflow: {
      title1: "Music, Wind, Spirit Flow",
      title2: "Sounds Of India",
      description: "Mantra-Ghanta-Kirtan-Drizzle-Conch",
      image: "/images/gallery/6.jpg"
    }
  };
  
  fs.writeFileSync(contentFilePath, JSON.stringify(defaultContent, null, 2));
  console.log('Created default content.json file');
}

// Initialize Stripe with secret key
let stripeClient;
try {
  // Make sure the secret key is valid and properly formatted
  if (!config.stripeSecretKey) {
    console.error('CRITICAL ERROR: Stripe secret key is missing. Payments will not work.');
  } else {
    // Clean up the key - remove any whitespace
    const cleanKey = config.stripeSecretKey.trim();
    stripeClient = stripe(cleanKey);
    console.log('Stripe client initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Stripe client:', error.message);
}

// Create payment intent
app.post('/create-payment', async (req, res) => {
  try {
    // Check if Stripe client was initialized properly
    if (!stripeClient) {
      throw new Error('Stripe client not initialized. Please check your Stripe API keys.');
    }
    
    const { amount, paymentMethodId, customerInfo, bookingDetails, isMobile } = req.body;
    
    console.log('Payment request received:', {
      amount,
      email: customerInfo.email,
      name: customerInfo.name,
      mode: config.paymentMode,
      isMobile: isMobile ? 'yes' : 'no'
    });
    
    // Process payment based on the configured mode
    console.log('Config says useRealPayments:', config.useRealPayments);
    console.log('Using frontend URL:', config.frontendUrl);
    console.log('Payment mode is:', config.paymentMode);
    
    // Debug Stripe key (show only first few characters for security)
    const secretKeyPrefix = config.stripeSecretKey ? 
      `${config.stripeSecretKey.substring(0, 8)}...` : 'undefined';
    console.log('Stripe key prefix:', secretKeyPrefix);
    
    // Configure payment intent options with mobile considerations
    const paymentIntentOptions = {
      amount: Math.round(amount * 100), // Convert to cents and ensure integer
      currency: 'gbp',
      payment_method: paymentMethodId,
      // For mobile, disable automatic confirmation to avoid 3DS redirect issues
      confirm: isMobile ? false : true,
      // Make this optional for mobile
      ...(isMobile ? {} : { return_url: `${config.frontendUrl}/booking/confirmation` })
    };
    
    // For debugging
    console.log('Payment intent options:', JSON.stringify(paymentIntentOptions));
    
    if (config.useRealPayments) {
      // LIVE Payment Mode - Real transactions
      console.log('Processing LIVE payment with Stripe...');
      
      try {
        // Create the payment intent with our options
        const paymentIntent = await stripeClient.paymentIntents.create(paymentIntentOptions);
        
        console.log('Live payment intent created:', paymentIntent.id);
        
        // For mobile devices, manually confirm the payment intent 
        let finalPaymentIntent = paymentIntent;
        if (isMobile && paymentIntent.status !== 'succeeded') {
          console.log('Mobile payment - manually confirming...');
          try {
            finalPaymentIntent = await stripeClient.paymentIntents.confirm(paymentIntent.id);
            console.log('Mobile payment confirmation result:', finalPaymentIntent.status);
          } catch (confirmError) {
            console.error('Error confirming mobile payment:', confirmError);
            // Still proceed to return the original payment intent
          }
        }
        
        console.log('Return URL:', `${config.frontendUrl}/booking/confirmation`);
        
        // Store booking in database
        if (mongoose.connection.readyState === 1) {
          try {
            console.log('Creating booking entry in database...');
            const newBooking = new Booking({
              fullName: bookingDetails.fullName,
              email: bookingDetails.email,
              mobile: bookingDetails.mobile,
              accommodations: bookingDetails.accommodations,
              specialRequirements: bookingDetails.specialRequirements,
              totalAmount: amount,
              paymentId: finalPaymentIntent.id,
              paymentStatus: finalPaymentIntent.status,
              bookingDate: new Date(),
              isMobile: !!isMobile
            });
            
            await newBooking.save();
            console.log('Booking saved to database:', newBooking._id);
            
            // Send confirmation emails
            try {
              console.log('📧 Attempting to send customer confirmation email to:', bookingDetails.email);
              const customerEmailResult = await emailService.sendBookingConfirmationEmail(newBooking);
              
              if (customerEmailResult.success) {
                newBooking.emailSent = true;
                await newBooking.save();
                console.log('✅ Customer confirmation email sent successfully! Message ID:', customerEmailResult.messageId);
              } else {
                console.error('❌ Failed to send customer confirmation email:', customerEmailResult.error);
              }
              
              console.log('📧 Attempting to send admin notification email to:', process.env.ADMIN_EMAILS);
              const adminEmailResult = await emailService.sendAdminNotificationEmail(newBooking);
              
              if (adminEmailResult.success) {
                newBooking.adminNotified = true;
                await newBooking.save();
                console.log('✅ Admin notification email sent successfully! Message ID:', adminEmailResult.messageId);
              } else {
                console.error('❌ Failed to send admin notification email:', adminEmailResult.error);
              }
            } catch (emailError) {
              console.error('❌❌ CRITICAL ERROR in email sending process:', emailError);
              console.error('Stack trace:', emailError.stack);
            }
          } catch (dbError) {
            console.error('Error saving live booking to database:', dbError);
          }
        } else {
          console.warn('⚠️ MongoDB not connected - booking saved but emails not sent');
        }
        
        // Send booking confirmation with real payment info
        res.json({
          success: true,
          bookingSummary: {
            ...bookingDetails,
            paymentId: finalPaymentIntent.id,
            paymentStatus: finalPaymentIntent.status,
            total: amount,
            bookingDate: new Date().toISOString()
          }
        });
      } catch (stripeError) {
        console.error('Stripe payment error details:', {
          type: stripeError.type,
          code: stripeError.code,
          message: stripeError.message,
          decline_code: stripeError.decline_code,
          param: stripeError.param
        });
        
        throw stripeError; // Re-throw to be caught by the outer try/catch
      }
    } else {
      // SANDBOX Payment Mode - Using Stripe test API keys
      console.log('Processing SANDBOX payment with Stripe test keys...');
      
      // This uses the TEST API keys but follows the same process
      // as the live keys, allowing full testing without real charges
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents and ensure integer
        currency: 'gbp',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: `${config.frontendUrl}/booking/confirmation` // This should also use config
      });
      
      console.log('Sandbox payment successful:', paymentIntent.id);
      console.log('Return URL:', `${config.frontendUrl}/booking/confirmation`);
      
      // Store booking in database for sandbox mode too
      if (mongoose.connection.readyState === 1) {
        try {
          console.log('Creating sandbox booking entry in database...');
          const newBooking = new Booking({
            fullName: bookingDetails.fullName,
            email: bookingDetails.email,
            mobile: bookingDetails.mobile,
            accommodations: bookingDetails.accommodations,
            specialRequirements: bookingDetails.specialRequirements,
            totalAmount: amount,
            paymentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            bookingDate: new Date(),
            isMobile: !!isMobile
          });
          
          await newBooking.save();
          console.log('Sandbox booking saved to database:', newBooking._id);
          
          // Send confirmation emails
          try {
            console.log('📧 Attempting to send customer confirmation email to:', bookingDetails.email);
            const customerEmailResult = await emailService.sendBookingConfirmationEmail(newBooking);
            
            if (customerEmailResult.success) {
              newBooking.emailSent = true;
              await newBooking.save();
              console.log('✅ Customer confirmation email sent successfully! Message ID:', customerEmailResult.messageId);
            } else {
              console.error('❌ Failed to send customer confirmation email:', customerEmailResult.error);
            }
            
            console.log('📧 Attempting to send admin notification email');
            const adminEmailResult = await emailService.sendAdminNotificationEmail(newBooking);
            
            if (adminEmailResult.success) {
              newBooking.adminNotified = true;
              await newBooking.save();
              console.log('✅ Admin notification email sent successfully! Message ID:', adminEmailResult.messageId);
            } else {
              console.error('❌ Failed to send admin notification email:', adminEmailResult.error);
            }
          } catch (emailError) {
            console.error('❌❌ CRITICAL ERROR in sandbox email sending process:', emailError);
            console.error('Stack trace:', emailError.stack);
          }
        } catch (dbError) {
          console.error('Error saving sandbox booking to database:', dbError);
        }
      } else {
        console.warn('⚠️ MongoDB not connected - sandbox booking not saved');
      }
      
      // Send booking confirmation
      res.json({
        success: true,
        bookingSummary: {
          ...bookingDetails,
          paymentId: paymentIntent.id,
          paymentStatus: paymentIntent.status,
          total: amount,
          bookingDate: new Date().toISOString()
        }
      });
    }
    
  } catch (error) {
    console.error('Payment error:', error);
    
    // Send a more detailed error message for troubleshooting
    const errorMessage = error.message || 'An error occurred during the payment process';
    const errorCode = error.code || 'unknown';
    const errorType = error.type || 'general_error';
    
    res.status(400).json({
      error: {
        message: errorMessage,
        code: errorCode,
        type: errorType,
        details: 'Check server logs for more details'
      }
    });
  }
});

// Test route for direct payment success
app.post('/test-payment-success', async (req, res) => {
  try {
    const { bookingDetails, amount } = req.body;
    
    console.log('Test payment received:', {
      amount,
      bookingDetails
    });
    
    // Generate mock payment ID
    const mockPaymentId = 'pi_live_' + Math.random().toString(36).substring(2, 15);
    
    // Create booking summary
    const bookingSummary = {
      ...bookingDetails,
      paymentId: mockPaymentId,
      paymentStatus: 'succeeded',
      total: amount,
      bookingDate: new Date().toISOString()
    };
    
    // If MongoDB is connected, store this booking
    if (mongoose.connection.readyState === 1) {
      try {
        const newBooking = new Booking({
          fullName: bookingDetails.fullName,
          email: bookingDetails.email,
          mobile: bookingDetails.mobile,
          accommodations: bookingDetails.accommodations,
          specialRequirements: bookingDetails.specialRequirements,
          totalAmount: amount,
          paymentId: mockPaymentId,
          paymentStatus: 'succeeded',
          bookingDate: new Date()
        });
        
        await newBooking.save();
        console.log('Test booking saved to database:', newBooking._id);
        
        // Send confirmation emails
        try {
          const customerEmailResult = await emailService.sendBookingConfirmationEmail(newBooking);
          
          if (customerEmailResult.success) {
            newBooking.emailSent = true;
            await newBooking.save();
            console.log('Customer confirmation email sent for test booking');
          }
          
          const adminEmailResult = await emailService.sendAdminNotificationEmail(newBooking);
          
          if (adminEmailResult.success) {
            newBooking.adminNotified = true;
            await newBooking.save();
            console.log('Admin notification email sent for test booking');
          }
        } catch (emailError) {
          console.error('Error sending emails for test booking:', emailError);
        }
      } catch (dbError) {
        console.error('Error saving test booking to database:', dbError);
      }
    }
    
    // Return success
    res.json({
      success: true,
      bookingSummary
    });
    
  } catch (error) {
    console.error('Test payment error:', error);
    res.status(400).json({
      error: {
        message: error.message || 'Test payment error'
      }
    });
  }
});

// In the booking-details endpoint, update to check database first
app.get('/booking-details', async (req, res) => {
  try {
    const { session_id } = req.query;
    
    if (!session_id) {
      return res.status(400).json({
        success: false,
        error: 'No session ID provided'
      });
    }
    
    // First check if we have this booking in our database
    let booking = null;
    
    if (mongoose.connection.readyState === 1) {
      booking = await Booking.findOne({ sessionId: session_id });
    }
    
    if (booking) {
      // Return booking from database
      return res.json({
        success: true,
        bookingSummary: {
          fullName: booking.fullName,
          email: booking.email,
          mobile: booking.mobile,
          accommodations: booking.accommodations,
          specialRequirements: booking.specialRequirements,
          paymentId: booking.paymentId,
          paymentStatus: booking.paymentStatus,
          total: booking.totalAmount,
          bookingDate: booking.bookingDate
        }
      });
    }
    
    // If not in database, retrieve from Stripe
    const session = await stripeClient.checkout.sessions.retrieve(session_id);
    
    // Parse the client_reference_id which contains our booking details
    const bookingDetails = JSON.parse(session.client_reference_id || '{}');
    
    // Create a summary object
    const bookingSummary = {
      ...bookingDetails,
      paymentId: session.payment_intent,
      paymentStatus: session.payment_status,
      total: session.amount_total / 100, // Convert from cents
      bookingDate: new Date().toISOString()
    };
    
    // If MongoDB is connected, store this booking
    if (mongoose.connection.readyState === 1) {
      try {
        const newBooking = new Booking({
          fullName: bookingDetails.fullName,
          email: bookingDetails.email,
          mobile: bookingDetails.mobile,
          accommodations: bookingDetails.accommodations,
          specialRequirements: bookingDetails.specialRequirements,
          totalAmount: session.amount_total / 100,
          paymentId: session.payment_intent,
          paymentStatus: session.payment_status,
          sessionId: session_id,
          bookingDate: new Date()
        });
        
        await newBooking.save();
        console.log('Booking saved to database:', newBooking._id);
        
        // Send confirmation emails
        try {
          const customerEmailResult = await emailService.sendBookingConfirmationEmail(newBooking);
          
          if (customerEmailResult.success) {
            newBooking.emailSent = true;
            await newBooking.save();
            console.log('Customer confirmation email sent');
          }
          
          const adminEmailResult = await emailService.sendAdminNotificationEmail(newBooking);
          
          if (adminEmailResult.success) {
            newBooking.adminNotified = true;
            await newBooking.save();
            console.log('Admin notification email sent');
          }
        } catch (emailError) {
          console.error('Error sending emails:', emailError);
        }
      } catch (dbError) {
        console.error('Error saving booking to database:', dbError);
      }
    }
    
    // Return the booking summary to the client
    res.json({
      success: true,
      bookingSummary
    });
    
  } catch (error) {
    console.error('Error retrieving booking details:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'An error occurred while retrieving booking details'
    });
  }
});

// Create a webhook endpoint to handle payment confirmation updates - duplicate for both paths
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    if (endpointSecret) {
      event = stripeClient.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      event = JSON.parse(payload.toString());
    }
    
    console.log('📢 Webhook received at /webhook:', event.type);
    
    // Handle payment_intent.succeeded event for all payments
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      console.log('🔔 Received webhook for payment success:', paymentIntent.id);
      
      // Update the booking record
      if (mongoose.connection.readyState === 1) {
        try {
          const booking = await Booking.findOne({ paymentId: paymentIntent.id });
          
          if (booking) {
            booking.paymentStatus = 'succeeded';
            await booking.save();
            console.log('✅ Updated booking status to succeeded:', booking._id);
            
            // Send confirmation emails if not already sent
            if (!booking.emailSent) {
              try {
                console.log('📧 Attempting to send customer confirmation email to:', booking.email);
                const customerEmailResult = await emailService.sendBookingConfirmationEmail(booking);
                
                if (customerEmailResult.success) {
                  booking.emailSent = true;
                  await booking.save();
                  console.log('✅ Customer confirmation email sent successfully! Message ID:', customerEmailResult.messageId);
                } else {
                  console.error('❌ Failed to send customer confirmation email:', customerEmailResult.error);
                }
                
                console.log('📧 Attempting to send admin notification email');
                const adminEmailResult = await emailService.sendAdminNotificationEmail(booking);
                
                if (adminEmailResult.success) {
                  booking.adminNotified = true;
                  await booking.save();
                  console.log('✅ Admin notification email sent successfully! Message ID:', adminEmailResult.messageId);
                } else {
                  console.error('❌ Failed to send admin notification email:', adminEmailResult.error);
                }
              } catch (emailError) {
                console.error('❌❌ CRITICAL ERROR in email sending process:', emailError);
                console.error('Stack trace:', emailError.stack);
              }
            } else {
              console.log('📧 Emails already sent for this booking');
            }
          } else {
            console.error('❌ Booking not found for payment ID:', paymentIntent.id);
          }
        } catch (dbError) {
          console.error('❌ Error updating booking in database:', dbError);
        }
      } else {
        console.log('⚠️ MongoDB not connected - cannot update booking or send emails');
      }
    }
    
    res.status(200).json({received: true});
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// New endpoint for mobile payments to create a payment intent without confirming it
app.post('/setup-payment-intent', async (req, res) => {
  try {
    console.log('💳 MOBILE PAYMENT SETUP REQUEST RECEIVED');
    
    // Check if Stripe client was initialized properly
    if (!stripeClient) {
      console.error('❌ MOBILE PAYMENT ERROR: Stripe client not initialized');
      throw new Error('Stripe client not initialized. Please check your Stripe API keys.');
    }
    
    const { amount, customerInfo, bookingDetails } = req.body;
    
    console.log('📱 Mobile payment details:', {
      amount,
      email: customerInfo?.email || 'missing',
      name: customerInfo?.name || 'missing',
      mode: config.paymentMode,
      headers: JSON.stringify(req.headers['user-agent'])
    });
    
    // Create a PaymentIntent without confirming it
    console.log('🔄 Creating payment intent for mobile...');
    
    const paymentIntentOptions = {
      amount: Math.round(amount * 100), // Convert to cents and ensure integer
      currency: 'gbp',
      payment_method_types: ['card'],
      // No payment_method as we'll confirm it on the client side
      // No confirm flag as we'll confirm it on the client side
      metadata: {
        fullName: bookingDetails.fullName,
        email: bookingDetails.email,
        mobile: bookingDetails.mobile,
        isMobile: 'true'
      }
    };
    
    console.log('📝 Payment intent options:', paymentIntentOptions);
    
    const paymentIntent = await stripeClient.paymentIntents.create(paymentIntentOptions);
    
    console.log('✅ Mobile payment intent created:', {
      id: paymentIntent.id, 
      clientSecret: paymentIntent.client_secret ? 'present (not shown)' : 'missing',
      status: paymentIntent.status
    });
    
    // Create placeholder booking entry
    if (mongoose.connection.readyState === 1) {
      try {
        console.log('📝 Creating booking placeholder in database...');
        const newBooking = new Booking({
          fullName: bookingDetails.fullName,
          email: bookingDetails.email,
          mobile: bookingDetails.mobile,
          accommodations: bookingDetails.accommodations,
          specialRequirements: bookingDetails.specialRequirements,
          totalAmount: amount,
          paymentId: paymentIntent.id,
          paymentStatus: 'processing', // Will be updated when payment completes
          bookingDate: new Date(),
          isMobile: true
        });
        
        await newBooking.save();
        console.log('✅ Mobile booking placeholder saved to database:', newBooking._id);
        
        // Don't send confirmation emails for placeholder bookings - they'll be sent when payment completes
        console.log('ℹ️ Email will be sent after payment confirmation');
      } catch (dbError) {
        console.error('❌ Error saving mobile booking placeholder to database:', dbError);
        // Continue even if db save fails
      }
    } else {
      console.log('⚠️ MongoDB not connected - skipping booking placeholder creation');
    }
    
    // Return the client secret to the client to complete the payment
    console.log('📤 Sending client secret back to mobile client');
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
    
  } catch (error) {
    console.error('❌ MOBILE PAYMENT SETUP ERROR:', error);
    console.error('Error details:', JSON.stringify({
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack
    }));
    
    // Send a more detailed error message for troubleshooting
    const errorMessage = error.message || 'An error occurred during payment setup';
    const errorCode = error.code || 'unknown';
    const errorType = error.type || 'general_error';
    
    res.status(400).json({
      error: {
        message: errorMessage,
        code: errorCode,
        type: errorType,
        details: 'Check server logs for more details'
      }
    });
  }
});

// Add this after your existing webhook endpoint
// Test endpoint to manually trigger webhook processing for a payment intent
app.get('/test-webhook/:paymentIntentId', async (req, res) => {
  try {
    const paymentIntentId = req.params.paymentIntentId;
    console.log('🧪 TEST: Manually triggering webhook for payment intent:', paymentIntentId);
    
    // Find the booking
    if (mongoose.connection.readyState === 1) {
      const booking = await Booking.findOne({ paymentId: paymentIntentId });
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found for this payment intent' });
      }
      
      console.log('✅ TEST: Found booking:', booking._id);
      booking.paymentStatus = 'succeeded';
      await booking.save();
      
      // Send emails if not already sent
      if (!booking.emailSent) {
        try {
          console.log('📧 TEST: Attempting to send customer confirmation email to:', booking.email);
          const customerEmailResult = await emailService.sendBookingConfirmationEmail(booking);
          
          if (customerEmailResult.success) {
            booking.emailSent = true;
            await booking.save();
            console.log('✅ TEST: Customer confirmation email sent successfully! Message ID:', customerEmailResult.messageId);
          } else {
            console.error('❌ TEST: Failed to send customer confirmation email:', customerEmailResult.error);
          }
          
          console.log('📧 TEST: Attempting to send admin notification email');
          const adminEmailResult = await emailService.sendAdminNotificationEmail(booking);
          
          if (adminEmailResult.success) {
            booking.adminNotified = true;
            await booking.save();
            console.log('✅ TEST: Admin notification email sent successfully! Message ID:', adminEmailResult.messageId);
          } else {
            console.error('❌ TEST: Failed to send admin notification email:', adminEmailResult.error);
          }
          
          return res.json({ 
            success: true, 
            message: 'Emails triggered successfully', 
            customerEmail: customerEmailResult, 
            adminEmail: adminEmailResult 
          });
        } catch (emailError) {
          console.error('❌❌ TEST: CRITICAL ERROR in email sending process:', emailError);
          console.error('Stack trace:', emailError.stack);
          return res.status(500).json({ error: 'Error sending emails', details: emailError.message });
        }
      } else {
        console.log('📧 TEST: Emails already sent for this booking');
        return res.json({ message: 'Emails already sent for this booking' });
      }
    } else {
      console.log('⚠️ TEST: MongoDB not connected - cannot update booking or send emails');
      return res.status(500).json({ error: 'MongoDB not connected' });
    }
  } catch (err) {
    console.error('❌ TEST endpoint error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Uncomment MongoDB connection
// Remove the comment block around MongoDB connection
const MONGODB_URI = config.mongodbUri;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Initialize email transporter after DB connection
    emailService.initializeTransporter();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
      } else {
        console.error('Error starting server:', err);
      }
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    // Start server anyway even if MongoDB connection fails
    emailService.initializeTransporter();
    
    app.listen(PORT, () => {
      console.log(`MongoDB connection failed, but server is running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
      } else {
        console.error('Error starting server:', err);
      }
    });
  });

// Comment out the direct server start since we're starting after MongoDB connection
/*
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error('Error starting server:', err);
  }
}); 
*/

// Set port and start server
const PORT = config.port; 