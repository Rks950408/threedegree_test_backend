import { Container, Box, Typography } from "@mui/material";
import background from "../assets/shop-1.png";
import Pattern from "../assets/Pattern.png";
import spices from "../assets/shop-2.png";
import OverFlowSection from "../components/overflowSection";

const Shop = () => {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Coming Soon */}
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: { xs: "300px", md: "400px" },
            width: "100%",
          }}
        >
          {/* Overlay */}
          {/* <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            px: { xs: 4, md: 8 },
            py: { xs: 2, md: 3 },
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Josefin Sans",
              color: "#b04a26",
              fontWeight: 500,
              letterSpacing: "0.3rem",
              textAlign: "center",
            }}
          >
            COMING SOON !!
          </Typography>
        </Box> */}
        </Box>
      </Box>

      {/* Spices Section */}
      <OverFlowSection
        title1={"Heat, Tang, Sweet, Smoke"}
        title2={"Tastes Of India"}
        description={"Spices-Pickles-Curries-Fruits-Breads"}
        image={spices}
      />
    </Container>
  );
};

export default Shop;
