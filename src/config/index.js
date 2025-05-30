/**
 * Application configuration
 * Centralizes environment variables and configuration settings
 */

// Configuration values with environment-specific defaults
const config = {
  // API endpoints
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://51.20.107.198:5001",
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || "https://192.168.0.44:4433",

  // Stripe
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,

  // Environment detection
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,

  // App settings
  appName: "Three Degrees East",

  // Build version
  buildVersion: import.meta.env.VITE_BUILD_VERSION || "1.0.0",
};

export default config; 