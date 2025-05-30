import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

const ImageGallery = ({ images, isOpen, onClose, pdfUrl, initialIndex = 0 }) => {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Refs for touch events
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update current index when initialIndex prop changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  // Navigate to next image
  const goToNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Navigate to previous image
  const goToPreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Handle image loading
  const handleImageLoad = () => {
    setLoading(false);
  };

  // Handle image loading start
  const handleImageLoadStart = () => {
    setLoading(true);
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (pdfUrl) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'brochure.pdf'; // Suggested filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Touch event handlers for swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum distance to be considered a swipe
    
    if (difference > threshold) {
      // Swipe left, go to next image
      goToNextImage();
    } else if (difference < -threshold) {
      // Swipe right, go to previous image
      goToPreviousImage();
    }
    
    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          right: { xs: '10px', sm: '20px' },
          color: 'white',
          zIndex: 1010,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      
      {/* Download PDF button - icon only */}
      {pdfUrl && (
        <IconButton
          onClick={handleDownloadPDF}
          aria-label="Download PDF"
          sx={{
            position: 'absolute',
            top: { xs: '10px', sm: '20px' },
            left: { xs: '10px', sm: '20px' },
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            zIndex: 1010,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <DownloadIcon />
        </IconButton>
      )}
      
      {/* Outer container - reduced width */}
      <Box
        sx={{
          width: isMobile ? '100%' : '90%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Loading indicator */}
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        )}

        {/* Image container with touch events */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: isMobile ? '10px' : '20px',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.length > 0 && (
            <img
              src={typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex].src || images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '90%',
                objectFit: 'contain',
                userSelect: 'none', // Prevent text selection during swipe
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}
              onLoad={handleImageLoad}
              onLoadStart={handleImageLoadStart}
              draggable={false} // Prevent drag behavior
              onError={(e) => {
                // Try to load alternative format if available
                const src = e.target.src;
                if (src.endsWith('.jpg')) {
                  e.target.src = src.replace('.jpg', '.png');
                } else if (src.endsWith('.png')) {
                  e.target.src = src.replace('.png', '.jpeg');
                }
                // If all alternatives fail, the browser will show the default broken image icon
              }}
            />
          )}
        </Box>
      </Box>

      {/* Navigation buttons - adjusted for mobile */}
      <IconButton
        onClick={goToPreviousImage}
        disabled={currentIndex <= 0}
        sx={{
          position: 'absolute',
          left: { xs: '5px', sm: '16px' },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          zIndex: 1010,
          padding: { xs: '5px', sm: '8px' },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>

      <IconButton
        onClick={goToNextImage}
        disabled={currentIndex >= images.length - 1}
        sx={{
          position: 'absolute',
          right: { xs: '5px', sm: '16px' },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          zIndex: 1010,
          padding: { xs: '5px', sm: '8px' },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>

      {/* Image counter */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '10px', sm: '20px' },
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: { xs: '3px 10px', sm: '5px 15px' },
          borderRadius: '20px',
          zIndex: 1010,
          fontSize: { xs: '12px', sm: '14px' },
        }}
      >
        Image {currentIndex + 1} of {images.length}
      </Box>
    </Box>
  );
};

export default ImageGallery; 