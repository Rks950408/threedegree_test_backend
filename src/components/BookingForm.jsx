import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  Select, 
  MenuItem, 
  Grid, 
  Paper, 
  Snackbar, 
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Toggle between real API and mock mode - set to false when backend is ready
const USE_MOCK_API = true;
const BACKEND_URL = 'https://threedegreeseast.com/api';

// Sample retreat data
const RETREAT_DATA = {
  id: 'dharamshala-2024',
  name: 'Dharamshala Spiritual Retreat',
  description: 'A 7-day spiritual journey in the Himalayan foothills',
  currency: 'GBP'
};

// Room Inventory Configuration
// In a real app, these would be fetched from the backend
const ROOM_INVENTORY = {
  twinBedrooms: 5, // 5 Twin Bedrooms can accommodate 10 twin-sharing spots
  doubleBedrooms: 7, // 7 Double Bedrooms can accommodate 7 single occupancy spots
};

// Maximum spots available based on room inventory
const MAX_TWIN_SHARING_SPOTS = import.meta.env.VITE_MAX_TWIN_SHARING_SPOTS || 10;
const MAX_SINGLE_OCCUPANCY_SPOTS = import.meta.env.VITE_MAX_SINGLE_OCCUPANCY_SPOTS || 7;

// Accommodation options
const ACCOMMODATION_OPTIONS = [
  {
    id: 'double',
    name: 'Twin-Sharing',
    price: 1,
    discountNote: 'Price includes 20% discount',
    maxQuantity: MAX_TWIN_SHARING_SPOTS
  },
  {
    id: 'single',
    name: 'Single Occupancy',
    price: 1,
    maxQuantity: MAX_SINGLE_OCCUPANCY_SPOTS
  }
];

const BookingForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    specialRequirements: ''
  });
  
  // Room inventory state
  const [availableInventory, setAvailableInventory] = useState({
    twinSharing: MAX_TWIN_SHARING_SPOTS,
    singleOccupancy: MAX_SINGLE_OCCUPANCY_SPOTS
  });
  
  // Selected accommodations
  const [selectedAccommodations, setSelectedAccommodations] = useState({
    single: { selected: false, quantity: 0 },
    double: { selected: false, quantity: 0 }
  });
  
  // Track if any option is selected with quantity > 0
  const [isValidSelection, setIsValidSelection] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Load inventory data from backend/localStorage
  useEffect(() => {
    // In a real app, this would be an API call to get current inventory
    const fetchInventory = async () => {
      try {
        // For now, we'll just use localStorage as a simple inventory storage
        const savedInventory = localStorage.getItem('roomInventory');
        
        if (savedInventory) {
          const parsedInventory = JSON.parse(savedInventory);
          setAvailableInventory({
            twinSharing: parsedInventory.twinSharing || MAX_TWIN_SHARING_SPOTS,
            singleOccupancy: parsedInventory.singleOccupancy || MAX_SINGLE_OCCUPANCY_SPOTS
          });
        } else {
          // Initialize inventory in localStorage if not present
          localStorage.setItem('roomInventory', JSON.stringify({
            twinSharing: MAX_TWIN_SHARING_SPOTS,
            singleOccupancy: MAX_SINGLE_OCCUPANCY_SPOTS
          }));
        }
      } catch (error) {
        console.error('Error loading inventory:', error);
        // Fallback to default values if error occurs
        setAvailableInventory({
          twinSharing: MAX_TWIN_SHARING_SPOTS,
          singleOccupancy: MAX_SINGLE_OCCUPANCY_SPOTS
        });
      }
    };
    
    fetchInventory();
  }, []);

  // Check if at least one accommodation is selected with quantity > 0
  useEffect(() => {
    const hasSelection = Object.values(selectedAccommodations).some(
      option => option.selected && option.quantity > 0
    );
    setIsValidSelection(hasSelection);
  }, [selectedAccommodations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccommodationQuantityChange = (id, value) => {
    setSelectedAccommodations(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity: parseInt(value) }
    }));
  };

  const toggleAccommodation = (id) => {
    setSelectedAccommodations(prev => {
      // If activating an option that was disabled, set quantity to 1
      // If deactivating, set quantity to 0
      const newQuantity = !prev[id].selected ? 1 : 0;
      
      return {
        ...prev,
        [id]: { 
          selected: !prev[id].selected, 
          quantity: newQuantity 
        }
      };
    });
  };
  
  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  const handleCancel = () => {
    navigate('/travel');
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    
    Object.entries(selectedAccommodations).forEach(([id, details]) => {
      if (details.selected && details.quantity > 0) {
        const option = ACCOMMODATION_OPTIONS.find(opt => opt.id === id);
        if (option) {
          total += option.price * details.quantity;
        }
      }
    });
    
    return total;
  };

  // Update inventory after successful booking
  const updateInventory = () => {
    const newInventory = {
      twinSharing: availableInventory.twinSharing - (selectedAccommodations.double.selected ? selectedAccommodations.double.quantity : 0),
      singleOccupancy: availableInventory.singleOccupancy - (selectedAccommodations.single.selected ? selectedAccommodations.single.quantity : 0)
    };
    
    // Update localStorage (in a real app, this would be an API call)
    localStorage.setItem('roomInventory', JSON.stringify(newInventory));
    
    return newInventory;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.fullName || !formData.email || !formData.mobile) {
      setNotification({
        open: true,
        message: 'Please fill in all required fields: Full Name, Email Address, and Mobile Number.',
        severity: 'error'
      });
      return;
    }
    
    // Validate selection
    if (!isValidSelection) {
      setNotification({
        open: true,
        message: 'Please select at least one accommodation option.',
        severity: 'error'
      });
      return;
    }
    
    // Check if requested quantity exceeds available inventory
    if (
      (selectedAccommodations.double.selected && selectedAccommodations.double.quantity > availableInventory.twinSharing) ||
      (selectedAccommodations.single.selected && selectedAccommodations.single.quantity > availableInventory.singleOccupancy)
    ) {
      setNotification({
        open: true,
        message: 'Selected quantity exceeds available rooms. Please adjust your selection.',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare booking data
      const bookingData = {
        retreatId: RETREAT_DATA.id,
        retreatName: RETREAT_DATA.name,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        accommodations: selectedAccommodations,
        specialRequirements: formData.specialRequirements
      };
      
      // Calculate total amount
      const totalAmount = calculateTotal();
      
      // Update inventory
      const updatedInventory = updateInventory();
      
      // Show message before redirecting
      setNotification({
        open: true,
        message: 'Booking information received. Redirecting to payment...',
        severity: 'success'
      });
      
      // Short delay before redirecting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to payment page with booking data
      navigate('/payment', {
        state: {
          bookingData,
          totalAmount,
          updatedInventory
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      setNotification({
        open: true,
        message: error.message || 'An error occurred during booking',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate menu items based on available inventory
  const generateQuantityMenuItems = (optionId) => {
    const maxItems = optionId === 'double' 
      ? availableInventory.twinSharing 
      : availableInventory.singleOccupancy;
    
    // Limit to actual maximum or 10, whichever is smaller
    const limit = Math.min(maxItems, 10);
    
    return [...Array(limit + 1).keys()].map(i => (
      <MenuItem key={i} value={i}>{i}</MenuItem>
    ));
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, md: 4 }, 
        maxWidth: '1000px', 
        mx: 'auto', 
        mt: { xs: 3, md: 5 }, 
        mb: { xs: 3, md: 6 },
        backgroundColor: '#FEF8F2',
        border: '1px solid #f0e0d0',
        borderRadius: '8px'
      }}
    >
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: { xs: 1, md: 4 },
        pb: { xs: 1, md: 3 },
        borderBottom: '1px solid #f0e0d0'
      }}>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '1.8rem' },
            color: '#C47E5A',
            mb: 1
          }}
        >
          Complete Your Reservation
        </Typography>
        
        <Typography
          sx={{
            fontSize: { xs: '0.9rem', md: '1rem' },
            color: '#888',
            textAlign: 'center',
            maxWidth: '80%'
          }}
        >
          Fill in your details below to secure your spot for this transformative experience
        </Typography>
      </Box>
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 0 }}>
        {/* First Row: Personal Information (Name, Email, Mobile) */}
        <Grid container spacing={2} sx={{ mb: { xs: 2, md: 5 }, width: '100%', mx: 0 }}>
          <Grid item xs={12} md={4} sx={{ pl: 0, pr: { xs: 0, md: 8 } }}>
            <TextField
              required
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                width: { xs: '198%', md: '150%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  height: { xs: '40px', md: '50px' },
                  display: 'flex',
                  alignItems: 'center'
                },
                '& .MuiInputBase-input': {
                  padding: '0 14px',
                  fontSize: { xs: '0.85rem', md: '1rem' }
                }
              }}
              InputLabelProps={{
                sx: { 
                  ml: 1, 
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  transform: { xs: 'translate(14px, 11px) scale(1)', md: 'translate(14px, 16px) scale(1)' },
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)'
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ px: { xs: 0, md: 8 } }}>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                width: { xs: '198%', md: '150%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  height: { xs: '40px', md: '50px' },
                  display: 'flex',
                  alignItems: 'center'
                },
                '& .MuiInputBase-input': {
                  padding: '0 14px',
                  fontSize: { xs: '0.85rem', md: '1rem' }
                }
              }}
              InputLabelProps={{
                sx: { 
                  ml: 1, 
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  transform: { xs: 'translate(14px, 11px) scale(1)', md: 'translate(14px, 16px) scale(1)' },
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)'
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ pl: { xs: 0, md: 8 }, pr: 0 }}>
            <TextField
              required
              fullWidth
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                width: { xs: '198%', md: '150%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  height: { xs: '40px', md: '50px' },
                  display: 'flex',
                  alignItems: 'center'
                },
                '& .MuiInputBase-input': {
                  padding: '0 14px',
                  fontSize: { xs: '0.85rem', md: '1rem' }
                }
              }}
              InputLabelProps={{
                sx: { 
                  ml: 1, 
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  transform: { xs: 'translate(14px, 11px) scale(1)', md: 'translate(14px, 16px) scale(1)' },
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)'
                  }
                }
              }}
            />
          </Grid>
        </Grid>
        
        {/* Second Row: Accommodation Options (left) and Special Requirements (right) */}
        <Box sx={{ 
          display: 'flex', 
          mb: { xs: 1, md: 3 }, 
          gap: { xs: 1, md: 3 },
          flexDirection: { xs: 'column', md: 'row' } 
        }}>
          {/* Left Column: Accommodation Options */}
          <Box sx={{ width: { xs: '100%', md: '70%' } }}>
            <Typography 
              sx={{ 
                fontWeight: 600,
                mb: { xs: 0.75, md: 1.5 },
                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                color: '#555'
              }}
            >
              Accommodation Options
            </Typography>
            
            {/* Inventory Overview */}
            <Box sx={{ 
              mb: 2, 
              p: 2, 
              bgcolor: 'rgba(196, 126, 90, 0.08)', 
              borderRadius: '8px',
              border: '1px dashed rgba(196, 126, 90, 0.3)'
            }}>
              {/* <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, mb: 1, color: '#555' }}>
                Available Rooms:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                  Twin-Sharing: {availableInventory.twinSharing} spots available
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                  Single Occupancy: {availableInventory.singleOccupancy} spots available
                </Typography>
              </Box> */}
            </Box>
            
            {/* Twin-Sharing */}
            <Box
              sx={{
                mb: { xs: 1, md: 1.5 },
                p: { xs: 1, md: 1.2 },
                bgcolor: '#fafafa',
                borderRadius: '4px',
                border: '1px solid #eee'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  width: { xs: '55%', md: 'auto' }
                }}>
                  {/* Row 1: Plus icon and Twin-Sharing text side by side */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center'
                  }}>
                    <IconButton
                      onClick={() => toggleAccommodation('double')}
                      sx={{ color: '#C47E5A', mr: 1, p: 0.5 }}
                      size="small"
                    >
                      {selectedAccommodations.double.selected ? <DeleteIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                    </IconButton>
                    <Typography sx={{ 
                      fontSize: { xs: '0.85rem', md: '1rem' },
                      whiteSpace: 'nowrap'
                    }}>
                      {ACCOMMODATION_OPTIONS[0].name}
                    </Typography>
                  </Box>
                  
                  {/* Row 2: Discount text below */}
                  <Typography
                    sx={{
                      fontSize: { xs: '0.7rem', md: '0.8rem' },
                      color: 'success.main',
                      ml: { xs: 3.5, md: 3.5 }, // Indent to align with text above
                      mt: { xs: 0.3, md: 0.3 },
                      fontWeight: 500
                    }}
                  >
                    (20% discount applied)
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: { xs: '45%', md: 'auto' } }}>
                  <Box sx={{ 
                    position: 'relative', 
                    width: { xs: '65px', md: '100px' }, 
                    mr: 3,
                    left: { xs: -10, md: -30 }
                  }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        position: 'absolute',
                        top: -8,
                        left: 10,
                        px: 0.5,
                        bgcolor: '#f9f9f9',
                        zIndex: 1,
                        color: '#666',
                        fontSize: { xs: '0.6rem', md: '0.75rem' }
                      }}
                    >
                      Qty
                    </Typography>
                    <FormControl 
                      fullWidth
                      disabled={!selectedAccommodations.double.selected}
                    >
                      <Select
                        value={selectedAccommodations.double.quantity}
                        onChange={(e) => handleAccommodationQuantityChange('double', e.target.value)}
                        sx={{ 
                          bgcolor: 'white', 
                          height: { xs: '44px', md: '40px' },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ddd'
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: { xs: '1.2rem', md: '1.5rem' }
                          }
                        }}
                        displayEmpty
                      >
                        {generateQuantityMenuItems('double')}
                      </Select>
                    </FormControl>
                  </Box>

                  <Typography sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' },
                    fontWeight: 500,
                    color: '#555',
                    mt: '1%',
                    ml: '-8px',
                    whiteSpace: 'nowrap',
                    display: 'inline-block'
                  }}>
                    £{ACCOMMODATION_OPTIONS[0].price} {RETREAT_DATA.currency}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Single Occupancy */}
            <Box
              sx={{
                p: 1.2,
                bgcolor: '#fafafa',
                borderRadius: '4px',
                border: '1px solid #eee'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  width: { xs: '55%', md: 'auto' }
                }}>
                  <IconButton
                    onClick={() => toggleAccommodation('single')}
                    sx={{ color: '#C47E5A', mr: 1, p: 0.5 }}
                    size="small"
                  >
                    {selectedAccommodations.single.selected ? <DeleteIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                  </IconButton>
                  <Typography sx={{ 
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    whiteSpace: 'nowrap'
                  }}>
                    {ACCOMMODATION_OPTIONS[1].name}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: { xs: '45%', md: 'auto' } }}>
                  <Box sx={{ 
                    position: 'relative', 
                    width: { xs: '65px', md: '100px' }, 
                    mr: 3,
                    left: { xs: -10, md: -30 }
                  }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        position: 'absolute',
                        top: -8,
                        left: 10,
                        px: 0.5,
                        bgcolor: '#f9f9f9',
                        zIndex: 1,
                        color: '#666',
                        fontSize: { xs: '0.6rem', md: '0.75rem' }
                      }}
                    >
                      Qty
                    </Typography>
                    <FormControl 
                      fullWidth
                      disabled={!selectedAccommodations.single.selected}
                    >
                      <Select
                        value={selectedAccommodations.single.quantity}
                        onChange={(e) => handleAccommodationQuantityChange('single', e.target.value)}
                        sx={{ 
                          bgcolor: 'white', 
                          height: { xs: '44px', md: '40px' },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ddd'
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: { xs: '1.2rem', md: '1.5rem' }
                          }
                        }}
                        displayEmpty
                      >
                        {generateQuantityMenuItems('single')}
                      </Select>
                    </FormControl>
                  </Box>

                  <Typography sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' },
                    fontWeight: 500,
                    color: '#555',
                    mt: '1%',
                    ml: '-8px',
                    whiteSpace: 'nowrap',
                    display: 'inline-block'
                  }}>
                    £{ACCOMMODATION_OPTIONS[1].price} {RETREAT_DATA.currency}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          {/* Right Column: Special Requirements */}
          <Box sx={{ width: { xs: '100%', md: '30%' }, mt: { xs: 1, md: 0 } }}>
            <Typography 
              sx={{ 
                fontWeight: 600,
                mb: { xs: 0.75, md: 1.5 },
                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                color: '#555'
              }}
            >
              Special Requirements
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={{ xs: 3, md: 6 }}
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                maxHeight: { xs: '100px', md: '152px' },
                '& .MuiInputBase-root': {
                  maxHeight: { xs: '100px', md: '152px' }
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  height: { xs: '100px', md: '152px' },
                  maxHeight: { xs: '100px', md: '152px' }
                }
              }}
              InputProps={{
                sx: { maxHeight: { xs: '100px', md: '152px' } }
              }}
            />
          </Box>
        </Box>
        
        {/* Bottom Row: Buttons (Left) and Total (Right) */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: { xs: 0.5, md: 2 },
          flexDirection: { xs: 'column-reverse', md: 'row' },
          gap: { xs: 0.5, md: 0 }
        }}>
          {/* Buttons on the left */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            width: { xs: '100%', md: 'auto' },
            flexDirection: { xs: 'column-reverse', md: 'row' }
          }}>
            <Button
              onClick={handleCancel}
              variant="outlined"
              sx={{
                color: '#C47E5A',
                borderColor: '#C47E5A',
                padding: { xs: '10px 18px', md: '12px 24px' },
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: { xs: '0.85rem', md: '1rem' },
                fontWeight: 400,
                width: { xs: '100%', md: 'auto' },
                '&:hover': {
                  borderColor: '#B36D49',
                  color: '#B36D49',
                  backgroundColor: 'rgba(196, 126, 90, 0.04)'
                }
              }}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={loading || !isValidSelection}
              variant="contained"
              sx={{
                backgroundColor: '#C47E5A',
                color: '#fff',
                padding: { xs: '10px 18px', md: '12px 24px' },
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: { xs: '0.85rem', md: '1rem' },
                fontWeight: 400,
                boxShadow: 'none',
                width: { xs: '100%', md: 'auto' },
                '&:hover': {
                  backgroundColor: '#B36D49',
                  boxShadow: 'none'
                },
                '&.Mui-disabled': {
                  backgroundColor: '#E0E0E0',
                  color: '#666'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Proceed to Payment'}
            </Button>
          </Box>
          
          {/* Total on the right */}
          <Typography 
            sx={{ 
              fontWeight: 500,
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem' },
              textAlign: { xs: 'center', md: 'right' }
            }}
          >
            Total: {RETREAT_DATA.currency} {calculateTotal()}
          </Typography>
        </Box>
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
    </Paper>
  );
};

export default BookingForm; 