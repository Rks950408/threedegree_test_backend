import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; 
import palace from "../assets/home-1.png";
import mandalaIcon from "../assets/mandala.png";
import Pattern from "../assets/pattern.png";
import headerOverlay from "../assets/header-overlay.png";
import aboutUS from "../assets/home-6.jpg";
import travel from "../assets/home-7.png";
import bells from "../assets/bells.png";
import OverFlowSection from "../components/overflowSection";
import RetreatPopup from "../components/RetreatPopup";
import heroTry from "../assets/1/111.jpg";
import { useState } from "react";

const indiaFacts = [
  "In ancient India, sound healing (Nāda Yoga) was practiced, believing every being emits a unique vibration affecting health and emotions.",
  "The Rig Veda (c. 1500 BCE) mentions quantum-like ideas, describing the world as interconnected vibrations of energy.",
  "The concept of zero (śūnya) originated in India not just in mathematics but in Vedantic philosophy, where it represents the infinite potential of the cosmos.",
  "Navaratri, a festival dedicated to Goddess Durga, lasts 9 days but is celebrated differently across India—from Dandiya in Gujarat to Ayudha Puja in Tamil Nadu.",
  "Ancient Indians discovered water purification methods using copper pots and sunlight centuries before modern science confirmed their benefits.",
  "Chanakya (4th-century BCE) was the first to write about the concept of a 'secret service', detailing espionage methods in his book Arthashastra.",
  "Vedic Indians knew about plastic surgery! The Sushruta Samhita (6th century BCE) describes detailed nose reconstruction techniques.",
  "India's ancient iron pillar (Delhi, 400 CE) has barely rusted in over 1,600 years, showcasing metallurgical expertise still unexplained by modern science.",
  "Ghee is mentioned in the Vedas as 'liquid gold', not just for cooking but for enhancing memory and immunity.",
  "Indian temples were built with specific geometry to amplify 'Prana' (life energy), acting as natural healing centers.",
];

const HomePage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
  
    try {
      const response = await fetch("https://formspree.io/f/mgvaqego", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Thank you for subscribing!");
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
        console.error(data);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
      console.error(error);
    }
  };

  return (
    <Container disableGutters maxWidth={false}>
      {/* Retreat Popup */}
      {/* <RetreatPopup /> */}

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
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={heroTry}
          alt="Indian Architecture"
          sx={{
            width: { xs: "100%", md: "75%" },
            maxWidth: "1200px",
            borderRadius: "0px",
            mb: { xs: 0, md: 0 },
          }}
        />

        {/* Tagline overlaid below image */}
        {/* <Typography
          variant="h3"
          sx={{
            fontFamily: "brittany, cursive",
            fontWeight: 400,
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#FFF",
            mt: { xs: -10, md: -20 },
            mb: 2,
          }}
        >
          From India With Love
        </Typography> */}
        <Box
          component={"img"}
          src={headerOverlay}
          sx={{
            mt: { xs: -5, md: -12 },
            mb: { xs: -3, md: 2 },
            width: { xs: "40%", md: "35%", lg: "25%" },
            position: "relative",
            zIndex: 1,
          }}
          alt="overlay"
        />

        {/* Scroll Arrow */}
        <IconButton
          sx={{
            color: "#fff",
            backgroundColor: "#D07850",
            width: "27px",
            height: "27px",
            borderRadius: "100px",
            mt: { xs: 0, md: -1 },
            display: { xs: 'none', md: 'flex' },
            '&:hover': {
              backgroundColor: "#D07850",
            },
            padding: 0,
          }}
          onClick={() => {
            const el = document.getElementById("scrollTarget");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>

      {/* About Section */}
      <Box
        sx={{
          px: { xs: 7, md: "180px" },
          py: { xs: 4, md: 4 },
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: "161px" },
        }}
      >
        {/* Left: Image */}
        <Box
          component="img"
          src={aboutUS}
          alt="Temple"
          sx={{
            width: { xs: "100%", md: "45%" },
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />

        {/* Right: Text Content */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            textAlign: { xs: "center", md: "center" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "center" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Josefin Sans",
              fontSize: { xs: "24px", md: "30px" },
              fontWeight: 600,
              color: "#1C1C1C",
              mb: 2,
            }}
          >
            ABOUT US
          </Typography>

          <Box>
            <Typography
              sx={{
                fontFamily: "Lato",
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.8,
                color: "#1C1C1C",
                opacity: 0.6,
                mb: 2,
              }}
            >
              Three Degrees East was born from a shared desire to reconnect —
              with self, with nature, and with India's deep-rooted traditions.
              We create soulful journeys that honour the sacred and celebrate
              the simple.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.8,
                color: "#1C1C1C",
                opacity: 0.6,
              }}
            >
              Led by women and guided by purpose, our retreats offer more than
              escape — they invite transformation. With every step, chant, or
              meal, we hold space for reflection, healing, and the joy of
              rediscovery.
            </Typography>
          </Box>

          <Box
            component="img"
            src={mandalaIcon}
            alt="Mandala"
            sx={{
              width: "200px",
              mt: 4,
              mb: { xs: -3, md: 2 },
              mx: { xs: "auto", md: "auto" },
              display: "block",
            }}
          />
        </Box>
      </Box>

      {/* India Facts Section */}
      {/* <Box
        sx={{
          background: `url(${Pattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 2, md: 4 },
          px: 0,
          textAlign: "center",
        }}
      >
        <Box sx={{ backgroundColor: "background.paper", py: 3, opacity: 0.6 }}>
          <Typography
            sx={{
              fontFamily: "Josefin Sans",
              fontWeight: 600,
              fontSize: "30px",
              color: "#000",
              opacity: 1,
              mb: 2,
              mt: 2,
            }}
          >
            INDIA
          </Typography>

          <Box
            sx={{
              maxWidth: "90%",
              mx: "auto",
              textAlign: "left",
            }}
          >
            {indiaFacts.map((fact, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Lato",
                  lineHeight: 1.2,
                  fontSize: "18px",
                  color: "#1C1C1C",
                  mb: 2,
                }}
              >
                {idx + 1}. {fact}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box> */}

      {/* Travel Section */}
      <Box
        id="scrollTarget"
        sx={{
          px: { xs: 7, md: "180px" },
          py: { xs: 2, md: 4 },
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: "161px" },
        }}
      >
        {/* Left: Text Content */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            textAlign: { xs: "center", md: "center" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "center" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Josefin Sans",
              fontSize: { xs: "24px", md: "30px" },
              fontWeight: 600,
              color: "#1C1C1C",
              mb: 2,
            }}
          >
            TRAVEL
          </Typography>

          <Box>
            <Typography
              sx={{
                fontFamily: "Lato",
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.8,
                color: "#1C1C1C",
                opacity: 0.6,
                mb: 2,
              }}
            >
              India isn't just a destination — it's a deep exhale for your soul.
              Beyond the postcard-perfect Taj Mahal and colourful clichés, this
              is where ancient wisdom meets modern awakening. From Himalayan
              sunrises that still the mind to temple bells that stir the heart,
              every corner invites you to slow down, breathe deeper, and
              reconnect.
            </Typography>

            <Typography
              sx={{
                fontFamily: "Lato",
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.8,
                color: "#1C1C1C",
                opacity: 0.6,
              }}
            >
              Here, wellness isn't a trend — it's a way of life
              passed down through centuries of yoga, Ayurveda, and spiritual
              practice. Come for the culture, stay for the transformation. India
              doesn't just change your view — it changes you.
            </Typography>
          </Box>

        </Box>

        {/* Right: Image */}
        <Box
          component="img"
          src={travel}
          alt="Temple"
          sx={{
            width: { xs: "100%", md: "45%" },
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </Box>

      {/* Sacred Sounds Section */}
      <OverFlowSection
        image={bells}
        title1="Music, Wind, Spirit Flow"
        title2="Sounds Of India"
        description="Mantra-Ghanta-Kirtan-Drizzle-Conch"
      />

      {/* Newsletter Section */}
      <Box
        sx={{
          px: { xs: 3, md: 10 },
          py: { xs: 4, md: 4 },
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Josefin Sans",
            fontSize: { xs: "24px", md: "30px" },
            fontWeight: 600,
            color: "#1C1C1C",
            mb: 2,
          }}
        >
          NEWS LETTER
        </Typography>

        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: { xs: "16px", md: "18px" },
            lineHeight: 1.8,
            color: "#1C1C1C",
            opacity: 0.6,
            mb: 3,
            maxWidth: { xs: "600px", md: "800px" },
            width: "100%"
          }}
        >
          Be the first to know about our upcoming journeys — infused with
          healing, tradition, and purpose.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
            maxWidth: { xs: "500px", md: "800px" },
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                backgroundColor: "#fff",
                '& fieldset': {
                  borderColor: '#D07850',
                  borderWidth: '1px'
                },
                '&:hover fieldset': {
                  borderColor: '#D07850',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D07850',
                  borderWidth: '2px'
                }
              },
              maxWidth: { xs: "100%", md: "500px" },
              width: "100%"
            }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#D07850",
              color: "#fff",
              px: { xs: 4, md: 6 },
              py: 1.5,
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "Lato",
              "&:hover": {
                backgroundColor: "#a54825",
              },
              width: { xs: "100%", md: "auto" },
              minWidth: { md: "160px" }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
