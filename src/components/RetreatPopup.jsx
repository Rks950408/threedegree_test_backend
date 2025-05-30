import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// Import an image for Dharamshala if available, or use a similar image from assets
import dharamshalaThumbnail from '../assets/travel-gallery/shakti.png';

const RetreatPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Show popup after 1 second when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      // Always show the popup
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewRetreat = () => {
    setOpen(false);
    // Navigate to the travel page
    navigate('/travel');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 1,
          padding: { xs: '10px', md: '0px' },
          overflow: 'hidden',
          margin: { xs: '10px', md: 'auto' },
          background: '#FEF8F2'
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 10
      }}>
        <IconButton 
          onClick={handleClose} 
          aria-label="close"
          sx={{ 
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.5)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ 
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <Box
          component="img"
          src={dharamshalaThumbnail}
          alt="Dharamshala Retreat"
          sx={{
            width: '100%',
            height: { xs: '300px', sm: '400px' },
            maxHeight: { xs: '300px', sm: '400px' },
            objectFit: 'cover',
            objectPosition: 'center top'
          }}
        />
        
        <Box sx={{ 
          padding: { xs: '1.2rem', sm: '1.5rem' }, 
          textAlign: 'center' 
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: 'Josefin Sans',
              fontWeight: 600,
              mb: 3,
              color: 'custom.terracotta'
            }}
          >
            UPCOMING RETREAT
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleViewRetreat}
            fullWidth={isMobile}
            sx={{
              backgroundColor: 'custom.terracotta',
              color: '#fff',
              px: 4,
              py: 1.2,
              borderRadius: 0,
              fontWeight: 500,
              letterSpacing: '0.05em',
              fontFamily: 'Lato',
              '&:hover': {
                backgroundColor: '#b04a26',
              },
            }}
          >
            DISCOVER MORE
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RetreatPopup; 