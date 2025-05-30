import { Box, Typography } from "@mui/material";
import pasnaImg from "../assets/pasna.png";
import shilpaImg from "../assets/shilpa.png";

const FoundersSection = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 10 },
        py: { xs: 4, md: 2 },
      }}
    >
      {/* Pasna */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          mb: { xs: 8, md: 10 },
        }}
      >
        {/* Left Text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "Josefin Sans",
              fontWeight: 400,
              fontSize: { xs: "24px", md: "30px" },
              mb: { xs: 1, md: 2 },
              maxWidth: "500px",
              color: "#1C1C1C",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              px: { xs: 2, md: 0 },
            }}
          >
            Pasna - Co-Founder, Nature-Based Wellness Specialist
          </Typography>
          <Typography
            sx={{
              fontFamily: "Lato",
              color: "#1C1C1C",
              opacity: 0.6,
              lineHeight: 1.8,
              fontSize: { xs: "16px", md: "18px" },
              px: { xs: 2, md: 0 },
            }}
          >
            I am a Registered Occupational Therapist with 28 years of experience
            in Scotland's health and wellness sector. In the last decade, my
            focus has shifted fully to prevention and wellbeing—especially
            through nature. I founded an award-winning charity using creative,
            nature-based interventions that's been featured on BBC News, Ant &
            Dec's Saturday Night Takeaway, and in major national newspapers. We
            even made the front cover of a leading professional health journal.{" "}
            <br />
            <br />I have been invited to Downing Street twice in recognition of
            my contribution to health and wellbeing — and now, I'm bringing that
            passion to India, blending Eastern roots with modern science, where
            healing meets heritage, and nature becomes your guide.
          </Typography>
        </Box>

        {/* Right Image */}
        <Box
          component="img"
          src={pasnaImg}
          alt="Pasna"
          sx={{
            flex: 1,
            width: { xs: "85%", md: "100%" },
            maxWidth: { xs: "300px", md: "400px" },
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Mobile Separator */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          my: 4,
          width: '100%'
        }}
      >
        <Box
          sx={{
            width: '60%',
            height: '2px',
            bgcolor: '#D07850',
            opacity: 0.8
          }}
        />
      </Box>

      {/* Shilpa (Image Left, Text Right) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Right Text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "Josefin Sans",
              fontWeight: 400,
              fontSize: { xs: "24px", md: "30px" },
              mb: { xs: 1, md: 2 },
              maxWidth: "800px",
              color: "#1C1C1C",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              px: { xs: 2, md: 0 },
            }}
          >
            Shilpa - Co-Founder, Yoga Teacher & Menopause Wellness Guide
          </Typography>
          <Typography
            sx={{
              fontFamily: "Lato",
              color: "#1C1C1C",
              opacity: 0.6,
              lineHeight: 1.8,
              fontSize: { xs: "16px", md: "18px" },
              px: { xs: 2, md: 0 },
            }}
          >
            As a yoga teacher in my 50s, I've personally navigated the shifts of
            menopause and experienced the profound healing that movement,
            breath, and nature bring. I understand what it means to seek
            balance, strength, and renewal. <br />
            <br />
            Born and raised in India and living in the UK for nearly three
            decades, I deeply understand the desire for women to travel,
            explore, and heal. My retreats are designed to honour Western
            sensibilities while offering the most authentic Indian wellness
            experiences, combining time-honoured traditions and rituals with
            practical, accessible well-being practices. Whether you are looking
            for spiritual connection, physical rejuvenation, or emotional reset,
            our retreats are thoughtfully curated to help you rediscover
            yourself.
          </Typography>
        </Box>

        {/* Left Image */}
        <Box
          component="img"
          src={shilpaImg}
          alt="Shilpa"
          sx={{
            flex: 1,
            width: { xs: "85%", md: "100%" },
            maxWidth: { xs: "300px", md: "400px" },
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default FoundersSection;
