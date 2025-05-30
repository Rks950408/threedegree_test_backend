import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

const BookingConfirmationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Check if booking data was passed through location state
    if (location.state?.bookingSummary) {
      setBookingData(location.state.bookingSummary);
      console.log("Booking data from location state:", location.state.bookingSummary);
    } else {
      // Try to get the most recent booking from localStorage as fallback
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      if (bookings.length > 0) {
        // Get the most recent booking
        setBookingData(bookings[bookings.length - 1]);
        console.log("Booking data from localStorage:", bookings[bookings.length - 1]);
      }
    }
  }, [location]);

  if (!bookingData) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          No booking information available. Please complete a booking first.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/booking')}
          sx={{
            backgroundColor: theme.palette.custom.terracotta,
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: theme.palette.custom.red,
            }
          }}
        >
          Go to Booking Page
        </Button>
      </Container>
    );
  }

  // Generate booking reference number (in a real app, this would come from the backend)
  const bookingReference = bookingData.paymentId 
    ? bookingData.paymentId.substring(0, 8).toUpperCase() 
    : Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.custom.beige,
      minHeight: '100vh',
      pb: 6
    }}>
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.custom.terracotta,
          py: { xs: 3, sm: 4, md: 6 },
          mt: { xs: 3, sm: 4, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mb: { xs: 4, md: 6 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: { xs: '28px', sm: '32px', md: '38px' }, color: 'white', mr: 1.5 }} />
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Josefin Sans',
              fontWeight: 600,
              fontSize: { xs: '22px', sm: '28px', md: '42px' },
              color: '#fff',
              letterSpacing: '0.5px'
            }}
          >
            Booking Confirmed
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: { xs: '15px', sm: '16px', md: '18px' },
            color: '#fff',
            maxWidth: { xs: '90%', md: '800px' },
            mx: 'auto',
            px: { xs: 1, md: 0 },
            mb: 0,
            opacity: 0.9
          }}
        >
          Thank you for your booking! Your retreat experience awaits.
        </Typography>
      </Box>

      {/* Confirmation Content */}
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            backgroundColor: '#FEF8F2',
            border: '1px solid rgba(196, 126, 90, 0.2)',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            width: '100%'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: { xs: 1, md: 2 }
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: 'Josefin Sans',
                fontWeight: 600,
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                color: theme.palette.custom.darkBrown,
                mb: 2
              }}
            >
              Your Booking has been Confirmed
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: { xs: 0, md: 2 }, 
                maxWidth: '600px',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                color: theme.palette.text.primary,
                lineHeight: 1.6
              }}
            >
              We've sent a confirmation email to <strong>{bookingData.email}</strong> with all the details of your retreat booking.
            </Typography>
            
            <Box sx={{ 
              p: { xs: 2, md: 2.5 }, 
              border: `1px dashed ${theme.palette.custom.terracotta}`, 
              borderRadius: '6px',
              bgcolor: 'rgba(196, 126, 90, 0.08)',
              mb: 1,
              width: { xs: '100%', sm: '80%', md: '60%' },
              mx: 'auto'
            }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 500,
                  wordBreak: 'break-all'
                }}
              >
                Booking Reference: <span style={{ fontWeight: 700, color: theme.palette.custom.terracotta }}>{bookingReference}</span>
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3, mt: 2, opacity: 0.5 }} />
          
          {/* Booking Information Cards - Equal width side by side */}
          <Box sx={{ width: '100%', mb: 4 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                width: '100%'
              }}
            >
              {/* Customer Details */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '50%' },
                  display: 'flex',
                  flexGrow: 1
                }}
              >
                <Card variant="outlined" sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(196, 126, 90, 0.3)',
                  borderRadius: '8px',
                  backgroundColor: theme.palette.custom.beige,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }
                }}>
                  <CardContent sx={{ 
                    p: { xs: 2.5, md: 3 },
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2.5,
                      borderBottom: `2px solid ${theme.palette.custom.terracotta}`,
                      pb: 1.5
                    }}>
                      <PersonIcon sx={{ 
                        mr: 1.5, 
                        color: theme.palette.custom.terracotta,
                        fontSize: { xs: '22px', md: '24px' }
                      }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          fontFamily: 'Josefin Sans',
                          fontWeight: 600,
                          color: theme.palette.custom.darkBrown
                        }}
                      >
                        Customer Details
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      ml: { xs: 0, md: 0 }, 
                      pl: { xs: 0, md: 0 },
                      opacity: 0.9,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        borderLeft: `2px solid ${theme.palette.custom.terracotta}`,
                        pl: 2,
                        py: 1,
                        mb: 1.5
                      }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 600,
                            width: { xs: '100%', sm: '80px' },
                            color: theme.palette.custom.darkBrown,
                            mr: 2
                          }}
                        >
                          Name:
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            flex: 1
                          }}
                        >
                          {bookingData.fullName}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        borderLeft: `2px solid ${theme.palette.custom.terracotta}`,
                        pl: 2,
                        py: 1,
                        mb: 1.5
                      }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 600,
                            width: { xs: '100%', sm: '80px' },
                            color: theme.palette.custom.darkBrown,
                            mr: 2
                          }}
                        >
                          Email:
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            flex: 1,
                            wordBreak: 'break-word'
                          }}
                        >
                          {bookingData.email}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        borderLeft: `2px solid ${theme.palette.custom.terracotta}`,
                        pl: 2,
                        py: 1
                      }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 600,
                            width: { xs: '100%', sm: '80px' },
                            color: theme.palette.custom.darkBrown,
                            mr: 2
                          }}
                        >
                          Mobile:
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            flex: 1
                          }}
                        >
                          {bookingData.mobile}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              
              {/* Booking Summary */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '50%' },
                  display: 'flex',
                  flexGrow: 1
                }}
              >
                <Card variant="outlined" sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(196, 126, 90, 0.3)',
                  borderRadius: '8px',
                  backgroundColor: theme.palette.custom.beige,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }
                }}>
                  <CardContent sx={{ 
                    p: { xs: 2.5, md: 3 }, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2.5,
                      borderBottom: `2px solid ${theme.palette.custom.terracotta}`,
                      pb: 1.5
                    }}>
                      <ReceiptLongIcon sx={{ 
                        mr: 1.5, 
                        color: theme.palette.custom.terracotta,
                        fontSize: { xs: '22px', md: '24px' }
                      }} />
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          fontFamily: 'Josefin Sans',
                          fontWeight: 600,
                          color: theme.palette.custom.darkBrown
                        }}
                      >
                        Booking Summary
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Box>
                        {Object.entries(bookingData.accommodations || {}).map(([id, details]) => {
                          if (details.selected && details.quantity > 0) {
                            console.log("Rendering accommodation option:", id, details);
                            
                            // Force the correct option display regardless of the booking data structure
                            let option;
                            if (id === 'single') {
                              option = { name: 'Single Occupancy', price: 1 };
                            } else {
                              option = { name: 'Twin-Sharing', price: 1, discount: 20 };
                            }
                            
                            console.log("Option to display:", option);
                            
                            // The price for Twin-Sharing (£900) already includes the 20% discount
                            const totalPrice = option.price * details.quantity;
                              
                            return (
                              <Box 
                                key={id} 
                                sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  mb: 1.5,
                                  alignItems: 'center',
                                  padding: 1.5,
                                  borderRadius: '6px',
                                  backgroundColor: 'rgba(196, 126, 90, 0.08)',
                                  flexDirection: { xs: 'column', sm: 'row' },
                                }}
                              >
                                <Box sx={{ 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: { xs: 'center', sm: 'flex-start' },
                                  width: { xs: '100%', sm: 'auto' }
                                }}>
                                  <Typography 
                                    variant="body1"
                                    sx={{ 
                                      fontSize: { xs: '0.95rem', md: '1rem' },
                                      fontWeight: 500,
                                      color: theme.palette.custom.darkBrown
                                    }}
                                  >
                                    {option.name} × {details.quantity}
                                  </Typography>
                                  
                                  {id !== 'single' && (
                                    <Typography 
                                      variant="body2"
                                      sx={{ 
                                        fontSize: { xs: '0.85rem', md: '0.9rem' },
                                        fontWeight: 500,
                                        color: theme.palette.success.main,
                                        mt: 0.5
                                      }}
                                    >
                                      Price includes 20% discount
                                    </Typography>
                                  )}
                                </Box>
                                
                                <Typography 
                                  variant="body1"
                                  sx={{ 
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    fontWeight: 600,
                                    color: theme.palette.custom.terracotta,
                                    mt: { xs: 1, sm: 0 }
                                  }}
                                >
                                  £{totalPrice}
                                </Typography>
                              </Box>
                            );
                          }
                          return null;
                        })}
                      </Box>
                      
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          mt: 3,
                          pt: 1.5,
                          pb: 0.5,
                          borderTop: `2px solid ${theme.palette.custom.terracotta}`,
                          alignItems: 'center'
                        }}
                      >
                        <Typography 
                          variant="subtitle1"
                          sx={{ 
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            fontWeight: 600,
                            color: theme.palette.custom.darkBrown
                          }}
                        >
                          Total Paid:
                        </Typography>
                        <Typography 
                          variant="subtitle1"
                          sx={{ 
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            fontWeight: 700,
                            color: theme.palette.custom.terracotta
                          }}
                        >
                          £{bookingData.total}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
          
          {/* Special Requirements */}
          {bookingData.specialRequirements && (
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontFamily: 'Josefin Sans',
                  fontWeight: 600,
                  color: theme.palette.custom.darkBrown
                }}
              >
                Special Requirements
              </Typography>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  bgcolor: 'white',
                  borderColor: 'rgba(196, 126, 90, 0.3)',
                  borderRadius: '8px'
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.6,
                    color: theme.palette.text.primary
                  }}
                >
                  {bookingData.specialRequirements}
                </Typography>
              </Paper>
            </Box>
          )}
          
          {/* Next Steps */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(196, 126, 90, 0.08)', 
              p: { xs: 3, md: 4 }, 
              borderRadius: '8px', 
              mb: { xs: 4, md: 5 },
              border: '1px solid rgba(196, 126, 90, 0.15)'
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.custom.terracotta, 
                mb: 2.5,
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                fontFamily: 'Josefin Sans',
                fontWeight: 600
              }}
            >
              What Happens Next?
            </Typography>
            <Box component="ol" sx={{ pl: 2, m: 0 }}>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.6
                  }}
                >
                  Check your email inbox for a detailed confirmation of your booking.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.6
                  }}
                >
                  We'll be in touch approximately 3 weeks before the retreat with additional information about the venue, schedule, and what to bring.
                </Typography>
              </Box>
              <Box component="li">
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.6
                  }}
                >
                  Should you have any questions in the meantime, please contact us at <span style={{ fontWeight: 600, color: theme.palette.custom.terracotta }}>namaste@threedegreeseast.com</span>.
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: { xs: 2, md: 3 }, 
              flexWrap: 'wrap',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Button 
              variant="outlined" 
              onClick={() => navigate('/contact')}
              startIcon={<EmailIcon />}
              fullWidth={isMobile}
              sx={{
                color: theme.palette.custom.terracotta,
                borderColor: theme.palette.custom.terracotta,
                padding: { xs: '12px 20px', md: '14px 28px' },
                borderRadius: '6px',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 500,
                borderWidth: '1.5px',
                '&:hover': {
                  borderColor: theme.palette.custom.red,
                  color: theme.palette.custom.red,
                  borderWidth: '1.5px',
                  backgroundColor: 'rgba(196, 126, 90, 0.04)'
                }
              }}
            >
              Contact Us
            </Button>
            
            <Button 
              variant="contained"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              fullWidth={isMobile}
              sx={{
                backgroundColor: theme.palette.custom.terracotta,
                color: '#fff',
                padding: { xs: '12px 20px', md: '14px 28px' },
                borderRadius: '6px',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(196, 126, 90, 0.3)',
                '&:hover': {
                  backgroundColor: theme.palette.custom.red,
                  boxShadow: '0 6px 12px rgba(196, 126, 90, 0.4)'
                }
              }}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingConfirmationPage; 