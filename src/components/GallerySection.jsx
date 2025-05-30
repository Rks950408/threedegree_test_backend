import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";

const GallerySection = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const loadGalleryImages = () => {
      // Get base URL for public folder
      const baseUrl = window.location.origin;
      
      // List all known images (based on current directory listing)
      const knownImageFiles = [
        '1.jpg', '2.jpg', '3.jpg', '4.jpeg', '5.jpg', 
        '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', 
        '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', 
        '16.jpg', '17.jpg', '18.jpg', '19.jpg', 'raja.jpg'
      ];
      
      // Map each filename to its URL
      const images = knownImageFiles.map(filename => `${baseUrl}/images/gallery/${filename}`);
      
      // Preload images for smoother gallery experience
      images.forEach(url => {
        const img = new Image();
        img.src = url;
      });
      
      setGalleryImages(images);
    };

    loadGalleryImages();

    // Add a listener to re-scan when we navigate back to this route
    // This helps refresh the gallery when new images are added
    const handleRouteChange = () => {
      loadGalleryImages();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  // In case we have no images yet, show a loading state
  if (galleryImages.length === 0) {
    return (
      <Box
        sx={{
          px: { xs: 2, md: 10 },
          py: { xs: 6, md: 10 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px'
        }}
      >
        Loading gallery...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, md: 10 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {galleryImages.map((imgPath, idx) => (
          <Box
            key={idx}
            component="img"
            src={imgPath}
            alt={`gallery-${idx}`}
            onClick={() => handleImageClick(idx)}
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "1/1.3",
              borderRadius: "4px",
              objectFit: "cover",
              transition: "transform 0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onError={(e) => {
              console.error(`Failed to load image: ${imgPath}`);
              // Hide the broken image
              e.target.style.display = 'none';
            }}
          />
        ))}
      </Box>

      {/* Image Gallery Popup */}
      <ImageGallery 
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        initialIndex={currentImageIndex}
      />
    </Box>
  );
};

export default GallerySection;
