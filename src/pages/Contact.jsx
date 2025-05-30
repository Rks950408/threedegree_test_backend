import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import contactImage from "../assets/contact-1.png";
import mandala from "../assets/contact-2.png";
import img from "../assets/contact-3.png";
import OverFlowSection from "../components/overflowSection";
import { useState } from "react";
import Pattern from "../assets/pattern.png";

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/meoadoky", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Thanks for reaching out! We'll be in touch.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
        console.error(data);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ overflowX: "hidden" }}>
      {/* Form */}
      <Box
        sx={{
          px: { xs: 1, md: 8 },
          py: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left: Image */}
          <Grid item xs={12} md={5} sx={{ 
            width: { xs: "100%", md: "45%" },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box
              component="img"
              src={contactImage}
              alt="Contact Us"
              sx={{
                width: { xs: "85%", md: "100%" },
                height: "auto",
                maxWidth: { xs: "300px", md: "500px" },
                borderRadius: "4px",
                display: "block",
                objectFit: "cover"
              }}
            />
          </Grid>

          {/* Right: Text and Form */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ 
              width: { xs: "100%", md: "45%" },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' }
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
                mb: { xs: 2, md: 3 }
              }}
            >
              CONTACT US
            </Typography>

            <Typography
              sx={{
                fontFamily: "Lato",
                color: "#1C1C1C",
                opacity: 0.6,
                fontSize: { xs: "16px", md: "18px" },
                lineHeight: 1.8,
                maxWidth: "90%",
                mb: 4,
                textAlign: { xs: "center", md: "left" }
              }}
            >
              We would love to hear from you about any destinations that are on
              your bucket list. We will do our best to include that in our
              future tours.
            </Typography>

            {/* Form */}
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2,
                width: { xs: "90%", md: "100%" },
                maxWidth: { xs: "90%", md: "500px" }
              }}
            >
              <TextField
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
                size="small"
                sx={{
                  width: { xs: "100%", md: "auto" },
                  minWidth: { xs: "95%", md: "400px" }
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  width: "100%"
                }}
              >
                <TextField
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    minWidth: { xs: "95%", md: "195px" }
                  }}
                />
                <TextField
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    minWidth: { xs: "95%", md: "195px" }
                  }}
                />
              </Box>
              <TextField
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                multiline
                rows={6}
                fullWidth
                size="small"
                sx={{
                  width: { xs: "100%", md: "auto" }
                }}
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "custom.terracotta",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  width: "200px",
                  borderRadius: 0,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  fontFamily: "Lato",
                  "&:hover": {
                    backgroundColor: "#b04a26",
                  },
                }}
              >
                SEND MESSAGE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* India Facts Section */}
      <Box
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
              fontSize: { xs: "24px", md: "30px" },
              color: "#1C1C1C",
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
                  fontSize: { xs: "16px", md: "18px" },
                  color: "#1C1C1C",
                  mb: 2,
                  display: "flex",
                  alignItems: "flex-start"
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    color: "#D07850", 
                    fontWeight: 600, 
                    mr: 1,
                    minWidth: "24px"
                  }}
                >
                  {idx + 1}.
                </Box>
                {fact}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Contact Info */}
      <Box
        sx={{
          px: { xs: 1, md: 8 },
          py: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left: Text Content */}
          <Grid item xs={12} md={6} sx={{ 
            width: { xs: "100%", md: "40%" },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'center' },
            textAlign: 'center'
          }}>
            <Box sx={{ 
              maxWidth: "500px",
              width: "100%",
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}>
              <Typography
                sx={{
                  fontFamily: "Josefin Sans",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: { xs: "24px", md: "30px" },
                  color: "#1C1C1C",
                  letterSpacing: "1px",
                  mb: { xs: 2, md: 3 }
                }}
              >
                Get in Touch
              </Typography>

              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: { xs: "16px", md: "18px" },
                    color: "#1C1C1C",
                    opacity: 0.8,
                    lineHeight: 1.8,
                    '& span': {
                      color: '#D07850',
                      fontWeight: 600,
                      opacity: 1
                    }
                  }}
                >
                  <span>Call:</span> +44 141 4591029
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: { xs: "16px", md: "18px" },
                    color: "#1C1C1C",
                    opacity: 0.8,
                    lineHeight: 1.8,
                    '& span': {
                      color: '#D07850',
                      fontWeight: 600,
                      opacity: 1
                    }
                  }}
                >
                  <span>Email:</span> namaste@threedegreeseast.com
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: { xs: "16px", md: "18px" },
                    color: "#1C1C1C",
                    opacity: 0.8,
                    lineHeight: 1.8,
                    '& span': {
                      color: '#D07850',
                      fontWeight: 600,
                      opacity: 1
                    }
                  }}
                >
                  <span>Message:</span> +44 7825840489
                </Typography>
              </Box>

              <Box
                sx={{
                  width: '40%',
                  height: '2px',
                  bgcolor: '#D07850',
                  opacity: 0.8,
                  mx: 'auto',
                  my: 3
                }}
              />

              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: { xs: "16px", md: "18px" },
                  color: "#1C1C1C",
                  opacity: 0.8,
                  lineHeight: 1.8,
                  fontStyle: 'italic'
                }}
              >
                We endeavour to bring the best of India to you, with all the love!
              </Typography>
            </Box>
          </Grid>

          {/* Right: Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ 
              width: { xs: "100%", md: "35%" },
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Box
              component="img"
              src={mandala}
              alt="Traditional Art"
              sx={{
                width: { xs: "85%", md: "100%" },
                borderRadius: "4px",
                maxWidth: { xs: "300px", md: "400px" },
                display: "block",
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Texture Of India */}
      <OverFlowSection
        title1={"Touch, Tone, Earth, Energy"}
        title2={"Textures Of India"}
        description={"Cotton-Silk-Clay-Beads-Stone-Wood"}
        image={img}
      />
    </Container>
  );
};

export default Contact;
