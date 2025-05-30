import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  CircularProgress,
  TextField,
  Grid,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import config from '../config';

// Get Stripe publishable key from config
const stripePromise = loadStripe(config.stripePublishableKey);

// Stripe Elements options
const stripeElementsOptions = {
  // Force HTTPS
  loader: 'always',
  clientSecret: undefined,
  appearance: {
    theme: 'stripe'
  },
  // Add these lines to ensure proper security context
  fonts: [{
    cssSrc: 'https://fonts.googleapis.com/css?family=Lato:400,500,600'
  }],
  locale: 'en'
};

// API URL from config
const API_URL = config.apiBaseUrl;

// Mobile-specific options for Stripe
const getMobileStripeOptions = (isMobile) => {
  const baseOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Lato", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: isMobile ? '14px' : '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    },
    hidePostalCode: true
  };
  
  // Add mobile-specific adjustments
  if (isMobile) {
    baseOptions.style.base.iconColor = '#666EE8';
    baseOptions.style.base.padding = '12px';  
  }
  
  return baseOptions;
};

// CheckoutForm component
const CheckoutForm = ({ bookingData, totalAmount }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  // Initialize customer info from booking data - using state so it's accessible throughout component lifecycle
  const [customerInfo] = useState({
    name: bookingData?.fullName || '',
    email: bookingData?.email || '',
    phone: bookingData?.mobile || ''
  });

  // Debug function to log and display error information
  const logDebug = (message, obj = null) => {
    const formattedObj = obj ? (typeof obj === 'object' ? JSON.stringify(obj, null, 2) : obj) : '';
    console.log(`[PAYMENT DEBUG] ${message}`, obj || '');
    setDebugInfo(prev => `${prev}\n${message}${formattedObj ? ': ' + formattedObj : ''}`);
  };

  // Add function to test server connectivity
  const testServerConnection = async () => {
    try {
      logDebug('Testing server connectivity...');
      logDebug('Using API URL:', API_URL);
      logDebug('Network info:', { 
        online: navigator.onLine,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await fetch(`${API_URL}/ping`, {
          signal: controller.signal,
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          logDebug(`Server ping failed with status: ${response.status} (${response.statusText})`);
          return false;
        }
        
        const data = await response.json();
        logDebug('Server ping successful:', data);
        return true;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        logDebug('Server ping fetch error:', { 
          name: fetchError.name,
          message: fetchError.message,
          isAbortError: fetchError.name === 'AbortError'
        });
        
        // Only for mobile devices in development, try alternatives
        if (isMobile && config.isDevelopment) {
          // First try alternative: Direct IP with HTTP instead of HTTPS (Safari certificate issues)
          try {
            logDebug('Development environment detected on mobile, trying HTTP connection...');
            const httpUrl = API_URL.replace('https://', 'http://').replace('5443', '5001');
            const alternativeUrl = `${httpUrl}/ping`;
            logDebug('HTTP alternative URL:', alternativeUrl);
            
            const altResponse = await fetch(alternativeUrl, {
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            
            if (!altResponse.ok) {
              logDebug(`HTTP alternative ping failed with status: ${altResponse.status}`);
            } else {
              const altData = await altResponse.json();
              logDebug('HTTP alternative ping successful:', altData);
              // Store working URL for future requests
              window.workingApiUrl = httpUrl;
              return true;
            }
          } catch (altError) {
            logDebug('HTTP alternative ping error:', { 
              name: altError.name,
              message: altError.message 
            });
          }
          
          // Second try alternative: Try a completely different port combination
          try {
            logDebug('Trying third alternative connection...');
            const directUrl = "http://51.20.107.198:5001";
            http: logDebug("Direct server URL:", directUrl);
            
            const directResponse = await fetch(`${directUrl}/ping`, {
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            
            if (!directResponse.ok) {
              logDebug(`Direct server ping failed with status: ${directResponse.status}`);
              return false;
            }
            
            const directData = await directResponse.json();
            logDebug('Direct server ping successful:', directData);
            // Store working URL for future requests
            window.workingApiUrl = directUrl;
            return true;
          } catch (directError) {
            logDebug('Direct server ping error:', { 
              name: directError.name,
              message: directError.message 
            });
          }
        }
        
        return false;
      }
    } catch (error) {
      logDebug('Server ping general error:', { 
        name: error.name,
        message: error.message,
        stack: error.stack 
      });
      return false;
    }
  };

  // Function to get the best API endpoint to use
  const getBestApiEndpoint = (endpoint) => {
    // If we've found a working URL in development mode on mobile, use that
    if (isMobile && config.isDevelopment && window.workingApiUrl) {
      return `${window.workingApiUrl}${endpoint}`;
    }
    
    // Otherwise use the standard API URL from config
    return `${API_URL}${endpoint}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      logDebug('Stripe not loaded yet');
      return;
    }

    setLoading(true);
    setError(null);
    setDebugInfo('');
    
    logDebug(`Payment started - Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
    logDebug(`Amount: £${totalAmount}`);
    
    // Test server connectivity first
    const isServerReachable = await testServerConnection();
    if (!isServerReachable) {
      logDebug('⚠️ Server is unreachable, payment cannot proceed');
      setError('Cannot connect to payment server. Please check your internet connection and try again.');
      setLoading(false);
      return;
    }

    try {
      // Get the card element
      const cardElement = elements.getElement(CardElement);
      logDebug('Card element retrieved');
      
      if (isMobile) {
        // Mobile-specific flow to avoid redirect issues
        logDebug('Using mobile-specific payment flow');
        
        // Step 1: Create PaymentIntent directly on the server first
        logDebug('Sending setup request to server');
        const setupData = {
          amount: totalAmount,
          customerInfo: {
            name: bookingData.fullName,
            email: bookingData.email,
            phone: bookingData.mobile
          },
          bookingDetails: bookingData,
          isMobile: true
        };
        logDebug('Setup data:', setupData);
        
        try {
          // Use a timeout promise to detect network issues
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout - server not responding')), 15000)
          );
          
          // Get the best endpoint to use
          const endpointToUse = getBestApiEndpoint('/setup-payment-intent');
          logDebug('Payment endpoint:', endpointToUse);
          
          // Actual fetch request
          const fetchPromise = fetch(endpointToUse, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(setupData)
          });
          
          // Race between timeout and actual fetch
          const setupResponse = await Promise.race([fetchPromise, timeoutPromise]);
          
          logDebug(`Setup response status: ${setupResponse.status}`);
          
          if (!setupResponse.ok) {
            const errorText = await setupResponse.text();
            logDebug('Setup response error:', errorText);
            throw new Error(`Failed to set up payment intent: ${errorText || setupResponse.statusText}`);
          }
          
          let setupResult;
          try {
            setupResult = await setupResponse.json();
            logDebug('Setup response data:', setupResult);
          } catch (jsonError) {
            logDebug('Failed to parse JSON response:', jsonError);
            throw new Error('Invalid response from server');
          }
          
          const { clientSecret } = setupResult;
          
          if (!clientSecret) {
            logDebug('No client secret returned');
            throw new Error('No client secret returned from server');
          }
          
          logDebug('Got client secret for mobile payment');
          
          // Step 2: Confirm the payment with the client secret
          logDebug('Confirming card payment...');
          const confirmResult = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: customerInfo.name,
                  email: customerInfo.email,
                  phone: customerInfo.phone
                }
              }
            }
          );
          
          logDebug('Confirm payment result:', confirmResult);
          
          if (confirmResult.error) {
            logDebug('Payment confirmation error:', confirmResult.error);
            throw new Error(confirmResult.error.message);
          }
          
          const { paymentIntent } = confirmResult;
          logDebug('Payment confirmed:', paymentIntent);
          logDebug(`Status: ${paymentIntent.status}, ID: ${paymentIntent.id}`);
          
          // Handle successful confirmation
          setNotification({
            open: true,
            message: 'Payment successful! Your booking has been confirmed.',
            severity: 'success'
          });
          
          // Redirect to confirmation page after 2 seconds
          setTimeout(() => {
            navigate('/booking/confirmation', { 
              state: { 
                bookingSummary: {
                  ...bookingData,
                  paymentId: paymentIntent.id,
                  paymentStatus: paymentIntent.status,
                  total: totalAmount,
                  bookingDate: new Date().toISOString()
                } 
              }
            });
          }, 2000);
          
        } catch (networkError) {
          logDebug('Network error during setup:', networkError);
          // Log the full URL being used
          logDebug('API URL being used:', API_URL); 
          // Check if the API URL is using the correct protocol (https)
          logDebug('API URL protocol:', API_URL.startsWith('https') ? 'https' : 'not https');
          throw networkError;
        }
        
      } else {
        // Desktop payment flow
        logDebug('Using standard desktop payment flow');
        
        // First create a payment method
        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone
          }
        });

        if (stripeError) {
          logDebug('Stripe payment method error:', stripeError);
          setError(stripeError.message);
          setLoading(false);
          return;
        }
        
        logDebug('Payment method created successfully:', paymentMethod.id);
        
        // Send payment details to our backend API
        const paymentData = {
          paymentMethodId: paymentMethod.id,
          amount: totalAmount,
          customerInfo: {
            name: bookingData.fullName,
            email: bookingData.email,
            phone: bookingData.mobile
          },
          bookingDetails: bookingData,
          isMobile: false
        };
        
        logDebug('Sending payment data to server:', JSON.stringify(paymentData));

        const response = await fetch(getBestApiEndpoint('/create-payment'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          logDebug('Server response not OK:', response.status, errorText);
          throw new Error(`Server returned ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
          logDebug('Payment error from server:', result.error);
          setError(result.error.message || 'Payment failed. Please try again.');
          setLoading(false);
          return;
        }
        
        // Show success message
        setNotification({
          open: true,
          message: 'Payment successful! Your booking has been confirmed.',
          severity: 'success'
        });
        
        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
          navigate('/booking/confirmation', { 
            state: { bookingSummary: result.bookingSummary }
          });
        }, 2000);
      }
    } catch (err) {
      logDebug('Payment processing error:', err);
      console.error('Payment processing error:', err);
      setError(`Payment error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/booking');
  };
  
  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
        Card Details
      </Typography>
      
      <Box 
        sx={{ 
          p: { xs: 1.5, md: 2 }, 
          border: '1px solid #e0e0e0', 
          borderRadius: 1, 
          mb: { xs: 3, md: 4 },
          bgcolor: 'white'
        }}
      >
        <CardElement 
          options={getMobileStripeOptions(isMobile)} 
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {debugInfo && isMobile && (
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f7f7f7', borderRadius: 1, fontSize: '0.75rem', whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: '200px' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Debug Info:</Typography>
          {debugInfo}
        </Box>
      )}

      <Box sx={{ 
        display: 'flex', 
        justifyContent: { xs: 'center', sm: 'space-between' }, 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
        alignItems: 'center' 
      }}>
        <Button 
          variant="outlined" 
          onClick={handleCancel}
          disabled={loading}
          fullWidth={isMobile}
          sx={{
            color: theme.palette.custom.terracotta,
            borderColor: theme.palette.custom.terracotta,
            padding: { xs: '10px 18px', md: '12px 24px' },
            width: { xs: '100%', sm: 'auto' },
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: { xs: '0.85rem', md: '1rem' },
            fontWeight: 400,
            '&:hover': {
              borderColor: '#B36D49',
              color: '#B36D49',
              backgroundColor: 'rgba(196, 126, 90, 0.04)'
            }
          }}
        >
          Back to Booking
        </Button>
        
        <Button 
          type="submit"
          variant="contained"
          disabled={!stripe || loading}
          fullWidth={isMobile}
          sx={{
            backgroundColor: theme.palette.custom.terracotta,
            color: '#fff',
            padding: { xs: '10px 18px', md: '12px 24px' },
            width: { xs: '100%', sm: 'auto' },
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: { xs: '0.85rem', md: '1rem' },
            fontWeight: 400,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#B36D49',
              boxShadow: 'none'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Pay £${totalAmount}`
          )}
        </Button>
      </Box>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Main PaymentPage component
const PaymentPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Check if booking data was passed through location state
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData);
      setTotalAmount(location.state.totalAmount || 0);
    } else {
      // No booking data was provided, redirect back to booking page
      navigate('/booking');
    }
  }, [location, navigate]);

  if (!bookingData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <CircularProgress sx={{ color: theme.palette.custom.terracotta }} />
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false}>
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.custom.terracotta,
          py: { xs: 3, md: 6 },
          mt: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mb: { xs: 3, md: 6 }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Josefin Sans',
            fontWeight: 600,
            fontSize: { xs: '20px', sm: '26px', md: '42px' },
            color: '#fff',
            mb: 1.5,
          }}
        >
          Complete Your Payment
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: { xs: '14px', sm: '15px', md: '18px' },
            color: '#fff',
            maxWidth: { xs: '90%', md: '800px' },
            mx: 'auto',
            px: { xs: 1, md: 0 },
            mb: 0
          }}
        >
          Secure payment for your upcoming retreat experience
        </Typography>
      </Box>

      {/* Payment Content */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, mb: 6 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            backgroundColor: '#FEF8F2',
            border: '1px solid #f0e0d0',
            borderRadius: '8px'
          }}
        >
          {/* Booking Summary */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: 'Josefin Sans',
              fontWeight: 600,
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
              color: theme.palette.custom.terracotta,
              mb: 2.5 
            }}
          >
            Booking Summary
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Selected Accommodations</Typography>
            
            {Object.entries(bookingData.accommodations || {}).map(([id, details]) => {
              if (details.selected && details.quantity > 0) {
                const option = id === 'single' 
                  ? { name: 'Single Occupancy', price: 1 }
                  : { name: 'Double Occupancy', price: 1 };
                
                return (
                  <Box 
                    key={id} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      mb: 1 
                    }}
                  >
                    <Typography variant="body2">
                      {option.name} × {details.quantity}
                    </Typography>
                    <Typography variant="body2">
                      £{option.price * details.quantity}
                    </Typography>
                  </Box>
                );
              }
              return null;
            })}
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">Total Amount</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.custom.terracotta }}>
                £{totalAmount}
              </Typography>
            </Box>
          </Box>
          
          {/* Payment Form */}
          <Divider sx={{ mb: 4 }} />
          
          <Elements stripe={stripePromise} options={stripeElementsOptions}>
            <CheckoutForm bookingData={bookingData} totalAmount={totalAmount} />
          </Elements>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentPage; 