import { Box, Typography, Grid } from "@mui/material";
import banaras from "../assets/travel-gallery/vara.jpg";
import kerala from "../assets/travel-gallery/kerala.jpg";
import rajasthan from "../assets/travel-gallery/raja.jpg";
import rishi from "../assets/travel-gallery/rishi.jpg";
import tamil from "../assets/travel-gallery/tamil.jpg";
import vrindavan from "../assets/travel-gallery/vrinda.jpg";

const ExperienceIndia = () => {
  const cards1 = [
    {
      image: banaras,
      title: "VARANASI",
    },
    {
      image: kerala,
      title: "KERALA",
    },
    {
      image: rajasthan,
      title: "RAJASTHAN",
    },
  ];

  const cards2 = [
    {
      image: rishi,
      title: "RISHIKESH",
    },
    {
      image: tamil,
      title: "TAMIL NADU",
    },
    {
      image: vrindavan,
      title: "VRINDAVAN",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 3 },
        px: { xs: 2, md: 10 },
        textAlign: "center",
      }}
    >
      {/* Section Heading */}
      <Typography
        sx={{
          fontFamily: "Josefin Sans",
          textTransform: "uppercase",
          fontWeight: 500,
          fontSize: { xs: "24px", md: "30px" },
          color: "#1C1C1C",
          letterSpacing: "1px",
          mb: { xs: 1, md: 1 }
        }}
      >
        Experience India
      </Typography>

      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          mb: { xs: 3, md: 3 },
          display: "flex"
        }}
      >
        <Box
          sx={{
            width: { xs: "40%", md: "20%" },
            height: "2px",
            bgcolor: "#D07850",
            opacity: 0.8
          }}
        />
      </Box>

      {/* Grid of Cards */}
      <Grid container spacing={0} justifyContent="center">
        {cards1.map((card, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{ 
              width: { xs: "85%", md: "28%" },
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 2, md: 0 },
              mt: { xs: index === 0 ? 0 : 2, md: 0 }
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: { xs: "420px", md: "380px" },
                width: "100%",
                overflow: "hidden",
                border: "1px solid black",
                mx: { md: 2 }
              }}
            >
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  width: "90%",
                  backgroundColor: "#e6d9c6",
                  border: "1px solid black",
                  p: 0.5,
                  mx: "5%",
                }}
              >
                <Box sx={{ border: "1px solid black", p: 0.75 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: "Josefin Sans",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      fontSize: { xs: "14px", md: "16px" },
                      textTransform: "uppercase",
                      color: "#1C1C1C"
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "Lato",
                      fontSize: { xs: "12px", md: "14px" },
                      display: "block",
                      mt: 0.5,
                      color: "#1C1C1C",
                      opacity: 0.8
                    }}
                  >
                    Coming Soon
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          my: { xs: 2, md: 3 },
          display: { xs: "none", md: "flex" }
        }}
      >
        <Box
          sx={{
            width: { xs: "40%", md: "25%" },
            height: "2px",
            bgcolor: "#D07850",
            opacity: 0.8
          }}
        />
      </Box>

       {/* Grid of Cards */}
       <Grid container spacing={0} justifyContent="center">
       {cards2.map((card, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{ 
              width: { xs: "85%", md: "28%" },
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 2, md: 0 },
              mt: { xs: index === 0 ? 2 : 2, md: 0 }
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: { xs: "420px", md: "380px" },
                width: "100%",
                overflow: "hidden",
                border: "1px solid black",
                mx: { md: 2 }
              }}
            >
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  width: "90%",
                  backgroundColor: "#e6d9c6",
                  border: "1px solid black",
                  p: 0.5,
                  mx: "5%",
                }}
              >
                <Box sx={{ border: "1px solid black", p: 0.75 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: "Josefin Sans",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      fontSize: { xs: "14px", md: "16px" },
                      textTransform: "uppercase",
                      color: "#1C1C1C"
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "Lato",
                      fontSize: { xs: "12px", md: "14px" },
                      display: "block",
                      mt: 0.5,
                      color: "#1C1C1C",
                      opacity: 0.8
                    }}
                  >
                    Coming Soon
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExperienceIndia;
