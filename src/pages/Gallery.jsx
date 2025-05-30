import { Container, Box, Typography, Button } from "@mui/material";
import GallerySection from "../components/GallerySection";

const Gallery = () => {
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/447825840489?text=Hi%20there!%20I'm%20interested%20in%20learning%20more%20about%20your%20services.",
      "_blank"
    );
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ overflowX: "hidden" }}>
      <GallerySection />

      {/* Enquire Section */}
      <Box
        sx={{
          py: { xs: 0, md: 0 },
          mb: { xs: 5, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Josefin Sans",
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: { xs: "24px", md: "30px" },
            color: "#1C1C1C",
            letterSpacing: "1px",
            mb: { xs: 2, md: 3 },
            textAlign: "center"
          }}
        >
          TEMPTED TO TRAVEL TO INDIA?
        </Typography>

        <Button
          variant="contained"
          onClick={handleWhatsAppClick}
          sx={{
            backgroundColor: "custom.terracotta",
            color: "#fff",
            px: 4,
            py: 1,
            fontSize: "0.85rem",
            borderRadius: 0,
            letterSpacing: "0.15em",
            fontWeight: 400,
            fontFamily: "Lato",
            "&:hover": {
              backgroundColor: "#b04a26",
            },
          }}
        >
          ENQUIRE
        </Button>
      </Box>
    </Container>
  );
};

export default Gallery;
