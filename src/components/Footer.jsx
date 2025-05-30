import { Box, Typography, Grid, Link, IconButton, Stack } from "@mui/material";
import {
  LinkedIn,
  Instagram,
  YouTube,
  Twitter,
  MusicNote,
  Email,
  LocationOn,
  Call,
  Facebook,
} from "@mui/icons-material";
import logo from "../assets/4.png";

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: "background.paper", color: "#fff", pt: 6, pb: 2 }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 3, md: 10 } }}>
        <Grid container spacing={4}>
          {/* About Us */}
          <Grid item xs={12} md={6} sx={{ width: { xs: "100%", md: "46%" } }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "12px", md: "14px" },
                fontFamily: "Josefin Sans",
                mb: 2,
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              About Us
            </Typography>
            <Typography
              sx={{ 
                lineHeight: 1.8, 
                fontSize: { xs: "16px", md: "20px" },
                fontFamily: "Lato", 
                fontWeight: 400 
              }}
            >
              Three Degrees East was born from a shared desire to reconnect —
              with self, with nature, and with India's deep-rooted traditions.
              We create soulful journeys that honour the sacred and celebrate
              the simple.
            </Typography>
            <Typography
              sx={{ 
                lineHeight: 1.8, 
                fontSize: { xs: "16px", md: "20px" },
                fontFamily: "Lato", 
                fontWeight: 400,
                mt: 2 
              }}
            >
              Led by women and guided by purpose, our retreats offer more than
              escape — they invite transformation. With every step, chant, or
              meal, we hold space for reflection, healing, and the joy of
              rediscovery.
            </Typography>
          </Grid>

          {/* Menu */}
          <Grid item xs={12} md={2} sx={{ width: { xs: "100%", md: "20%" } }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "12px", md: "14px" },
                fontFamily: "Josefin Sans",
                mb: 2,
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              Menu
            </Typography>
            <Stack spacing={1} sx={{ ml: 0 }}>
              {[
                { label: "Home", path: "/" },
                { label: "Travel", path: "/travel" },
                { label: "About", path: "/about" },
                { label: "Gallery", path: "/gallery" },
                { label: "Shop", path: "/shop" },
                { label: "Contact", path: "/contact" },
                { label: "Privacy Policy", path: "/privacy policy" },
                { label: "Terms & Conditions", path: "/terms & conditions" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  underline="none"
                  color="#fff"
                  sx={{
                    fontSize: { xs: "16px", md: "20px" },
                    fontFamily: "Lato",
                    fontWeight: 400,
                    lineHeight: { xs: 1.4, md: 1.6 },
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      textDecoration: "underline",
                      opacity: 0.8 
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4} sx={{ width: { xs: "100%", md: "28%" } }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "12px", md: "14px" },
                fontFamily: "Josefin Sans",
                mb: 2,
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Call sx={{ fontSize: { xs: "20px", md: "24px" } }} />
                <Typography 
                  sx={{ 
                    fontSize: { xs: "16px", md: "20px" }, 
                    fontFamily: "Lato", 
                    fontWeight: 400 
                  }}
                >
                  +44 141 4591029
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: { xs: "20px", md: "24px" } }} />
                <Typography 
                  sx={{ 
                    fontSize: { xs: "16px", md: "20px" }, 
                    fontFamily: "Lato", 
                    fontWeight: 400 
                  }}
                >
                  namaste@threedegreeseast.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: { xs: "20px", md: "24px" } }} />
                <Typography 
                  sx={{ 
                    fontSize: { xs: "16px", md: "20px" }, 
                    fontFamily: "Lato", 
                    fontWeight: 400 
                  }}
                >
                  Glasgow, Scotland, UK
                </Typography>
              </Box>
            </Stack>
            <Link href="/" sx={{ display: 'block', textDecoration: 'none' }}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ 
                  width: { xs: "200px", md: "250px" }, 
                  mt: 3,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              />
            </Link>
          </Grid>
        </Grid>

        {/* Social Icons */}
        <Box sx={{ mt: 6 }}>
          <Typography
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: "12px", md: "14px" }, 
              fontFamily: "Josefin Sans", 
              mb: 2, 
              textTransform: "uppercase" 
            }}
          >
            Follow Us Freely
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <IconButton 
              color="inherit" 
              href="https://www.instagram.com/threedegreeseast/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://www.facebook.com/ThreeDegreesEast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </IconButton>
          </Stack>
        </Box>

        {/* Bottom Footer */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "right",
            mt: 6,
            pt: 2,
            fontSize: "0.85rem",
          }}
        >
          Designed by <Link href="https://beenait.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>beenaIT Solutions</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
