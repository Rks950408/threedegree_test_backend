import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  Stack,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExperienceIndia from "../components/ExperienceIndia";
import OverFlowSection from "../components/overflowSection";
import ImageGallery from "../components/ImageGallery";
import holi from "../assets/home-5.png";
import dharma from "../assets/dharma.mp4";
import TestimonialSlider from "../components/TestimonialSlider";
import CloseIcon from "@mui/icons-material/Close";

const Travel = () => {
  const [showBrochureGallery, setShowBrochureGallery] = useState(false);
  const navigate = useNavigate();
  
  // Use absolute path to ensure proper PDF loading in all contexts
  const pdfUrl = window.location.origin + "/pdf/DHARAMSHALA-9.pdf";
  
  // Array of image paths for the brochure gallery using PNG images
  const brochureImages = [
    "/images/brochure/1.png",
    "/images/brochure/2.png",
    "/images/brochure/3.png",
    "/images/brochure/4.png",
    "/images/brochure/5.png",
    "/images/brochure/6.png",
    "/images/brochure/7.png",
    "/images/brochure/8.png",
    "/images/brochure/9.png",
    "/images/brochure/10.png",
    "/images/brochure/11.png"
  ];

  const handleViewBrochure = () => {
    setShowBrochureGallery(true);
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          py: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: { xs: 0, md: 0 }
        }}
      >
        {/* Image */}
        <Box
          component="video"
          src={dharma}
          autoPlay
          muted
          loop
          playsInline
          sx={{
            width: { xs: "100%", md: "70%" },
            maxWidth: "1200px",
            height: "auto",
            borderRadius: "0px",
          }}
        />
      </Box>

      {/* Image Gallery */}
      <ImageGallery 
        images={brochureImages}
        isOpen={showBrochureGallery}
        onClose={() => setShowBrochureGallery(false)}
        pdfUrl={pdfUrl}
      />

      {/* Booking Section */}
      <Box
        sx={{
          py: { xs: 0, md: -1 },
          textAlign: "center",
          mb: { xs: 4, md: 6 }
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={handleBookNow}
            sx={{
              backgroundColor: "custom.terracotta",
              color: "#fff",
              px: 5,
              py: 1.5,
              borderRadius: 0,
              fontWeight: 500,
              letterSpacing: "0.05em",
              fontFamily: "Lato",
              "&:hover": {
                backgroundColor: "#b04a26",
              },
            }}
          >
            BOOK NOW
          </Button>

          <Button
            variant="outlined"
            onClick={handleViewBrochure}
            sx={{
              color: "custom.terracotta",
              borderColor: "custom.terracotta",
              px: 5,
              py: 1.5,
              borderRadius: 0,
              fontWeight: 500,
              letterSpacing: "0.05em",
              fontFamily: "Lato",
              "&:hover": {
                backgroundColor: "#f6eee4",
                borderColor: "#b04a26",
                color: "#b04a26",
              },
            }}
          >
            VIEW BROCHURE
          </Button>
        </Stack>
      </Box>

      {/* Experience India Section */}
      <Box sx={{ mb: { xs: -3, md: 5 } }}>
        <ExperienceIndia />
      </Box>

      {/* Colors of India Section */}
      <OverFlowSection
        title1="MUSIC, WIND, SPIRIT FLOW"
        title2={"Colours Of India"}
        description={"Marigold-Turmeric-Sari-Sunrise-Rangoli"}
        image={holi}
      />

      {/* Review Section - commented out but may be used in future */}
      {/* <TestimonialSlider /> */}
    </Container>
  );
};

export default Travel;
