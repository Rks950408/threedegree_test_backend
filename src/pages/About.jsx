import { Box, Container, Typography } from "@mui/material";

import aboutHero from "../assets/about-hero.png";
import FoundersSection from "../components/Founders";
import OverFlowSection from "../components/overflowSection";
import img from "../assets/home-2.png";
import overflowImage from "../assets/about-4.png";

const About = () => {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          py: { xs: 4, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={aboutHero}
          alt="Indian Architecture"
          sx={{
            width: { xs: "100%", md: "100%" },
            maxHeight: { xs: "300px", md: "500px" },
            borderRadius: "0px",
            mb: { xs: -3, md: -8 }, // Add margin bottom on mobile
            mt: { xs: -2, md: 0 }, // Reduce margin top on mobile
          }}
        />
      </Box>

      {/* Travel with us Section */}
      <Box
        sx={{
          px: { xs: 2, md: 10 },
          py: { xs: 2, md: 7 },
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
          }}
        >
          Come Travel With Us
        </Typography>

        <Typography
          sx={{
            fontFamily: "Lato",
            color: "#1C1C1C",
            opacity: 0.6,
            fontSize: { xs: "16px", md: "18px" },
            lineHeight: 1.8,
            maxWidth: "1000px",
            mx: "auto",
            px: { xs: 2, md: 0 },
          }}
        >
          We are a team of wellness practitioners, passionate about guiding you 
          through midlife transitions and beyond, using traditional Indian wisdom, 
          yoga, and nature therapy with a mandatory portion of Indian culture, history 
          and spirituality thrown in.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "Lato",
            fontSize: { xs: "16px", md: "18px" },
            lineHeight: 1.8,
            color: "#1C1C1C",
            opacity: 0.6,
            maxWidth: "1000px",
            mx: "auto",
            px: { xs: 2, md: 0 },
            mt: 2
          }}
        >
          Join us in India, where culture immersion & healing begins the moment you arrive.
        </Typography>
      </Box>

      {/* Founders Section */}
      <FoundersSection />

      <Box
        sx={{
          px: { xs: 2, md: 10 },
          py: { xs: 4, md: 2 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          component="blockquote"
          sx={{
            fontStyle: "italic",
            fontSize: { xs: "24px", md: "30px" },
            color: "#1C1C1C",
            opacity: 0.6,
            fontFamily: "Lato",
            textAlign: "center",
            px: { xs: 2, md: 0 },
          }}
        >
          “Each retreat is carefully curated to be a journey towards
          rediscovering yourself”.
        </Typography>
      </Box>

      <OverFlowSection
        image={overflowImage}
        title1={"STEAM, SMOKE, BLOOM, STILL"}
        title2={"Aromas Of India"}
        description={"Chai-Sandalwood-Incense-Jasmine-Camphor"}
      />
    </Container>
  );
};

export default About;
