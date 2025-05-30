/**
 * Server configuration
 * Centralizes environment variables and configuration settings
 */

// Debug raw environment variables
console.log('-------- Raw Environment Variables --------');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PAYMENT_MODE:', process.env.PAYMENT_MODE);
console.log('PORT:', process.env.PORT);
console.log('VITE_FRONTEND_URL:', process.env.VITE_FRONTEND_URL);
console.log('VITE_STRIPE_SECRET_KEY present:', !!process.env.VITE_STRIPE_SECRET_KEY);
console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);
console.log('-------------------------------------');

// Determine if we're in production - PROPERLY check environment
// Use the actual value from process.env, not default
const isProduction = process.env.NODE_ENV === 'production';

// Payment mode - PROPERLY get from environment
// This is the key fix - if PAYMENT_MODE is 'live' in .env, use that exact value
const paymentMode = process.env.PAYMENT_MODE === 'live' ? 'live' : 'sandbox';

// Ensure HTTPS for live payments
const useHttps = paymentMode === 'live';

// Configuration values with environment-specific defaults
const config = {
  // Server settings
  port: process.env.PORT || 5001,
  
  // Environment
  isProduction,
  isDevelopment: !isProduction,
  
  // API endpoints
  frontendUrl: process.env.VITE_FRONTEND_URL || 'https://localhost:4433',
  
  // Stripe
  stripeSecretKey: process.env.VITE_STRIPE_SECRET_KEY,
  
  // Payment settings
  paymentMode, // 'sandbox' or 'live'
  useRealPayments: paymentMode === 'live',
  useHttps, // Whether to use HTTPS (required for live payments)
  
  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/threedegrees',
  
  // Build version
  buildVersion: process.env.BUILD_VERSION || '1.0.0'
};

module.exports = config; 