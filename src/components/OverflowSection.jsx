import Pattern from "../assets/pattern.png";
import {
    Box,
    Typography,
  } from "@mui/material";

const OverFlowSection = ({image, title1, title2, description}) => {
    return (
        <Box
        sx={{
          backgroundImage: `url(${Pattern})`,
          backgroundSize: "cover",
          px: { xs: 2, md: 10 },
          py: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          overflow: "visible",
          position: "relative",
          my: { xs: 2, md: 10 }
        }}
      >
        {/* Left Circular Text Area */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            minHeight: { xs: "350px", md: "400px" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.default",
              border: "6px solid white",
              borderRadius: "50%",
              width: { xs: "320px", sm: "380px", md: "460px" },
              height: { xs: "320px", sm: "380px", md: "460px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              px: { xs: 2, md: 3 },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Lato",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: { xs: "12px", md: "14px" },
                mb: { xs: 0.5, md: 1 },
                color: "#353839",
              }}
            >
              {title1}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Josefin Sans",
                fontWeight: 600,
                mb: { xs: 1, md: 2 },
                fontSize: { xs: "20px", md: "24px" },
                color: "#353839",
              }}
            >
              {title2}
            </Typography>

            <Box
              sx={{
                borderLeft: "2px solid #333",
                height: {xs: "40px", md: "120px"},
                mb: { xs: 1, md: 2 },
              }}
            />

            <Typography
              sx={{
                fontFamily: "Lato",
                fontSize: { xs: "14px", md: "16px" },
                color: "#353839",
                maxWidth: { xs: "260px", md: "none" },
                lineHeight: { xs: 1.4, md: 1.6 },
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
            position: { xs: "static" },
          }}
        >
          <Box
            component="img"
            src={image}
            alt="holi"
            sx={{
              width: { xs: "90%", md: "100%" },
              maxWidth: { xs: "90", md: "500px" },
              height: { xs: "auto", md: "120%" },
              position: { xs: "static", md: "absolute" },
              top: { md: "-10%" },
              border: { xs: "none", md: "20px solid #e6d9c6" },
              borderRadius: "4px",
              zIndex: 2,
              mr: { xs: 0, md: 10 },
              px: { xs: 2, md: 0 },
            }}
          />
        </Box>
      </Box>
    );
}

export default OverFlowSection;