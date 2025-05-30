import Slider from "react-slick";
import { Box, Typography, Stack } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  FormatQuote,
} from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample testimonials data
const testimonials = [
  {
    name: "Andrew Jackson",
    rating: 5,
    text: `The Design System is the most versatile I could get my hands on. Compared to all the others I have tried, this is the best premium library out there!`,
  },
  {
    name: "John Mike",
    rating: 5,
    text: `The Design System is the most versatile I could get my hands on. Compared to all the others I have tried, this is the best premium library out there!`,
  },
  {
    name: "Alex Jackson",
    rating: 5,
    text: `Compared to all the others I have tried, this is the best premium library out there! I love finalui design system`,
  },
  {
    name: "Alex Jackson",
    rating: 5,
    text: `Compared to all the others I have tried, this is the best premium library out there! I love finalui design system`,
  },
  {
    name: "Alex Jackson",
    rating: 5,
    text: `Compared to all the others I have tried, this is the best premium library out there! I love finalui design system`,
  },
  {
    name: "Alex Jackson",
    rating: 5,
    text: `Compared to all the others I have tried, this is the best premium library out there! I love finalui design system`,
  },
];

// Custom Arrows
const PrevArrow = (props) => (
  <Box
    sx={{
      position: "absolute",
      left: "-40px",
      top: "40%",
      zIndex: 1,
      cursor: "pointer",
    }}
    onClick={props.onClick}
  >
    <ArrowBackIos />
  </Box>
);

const NextArrow = (props) => (
  <Box
    sx={{
      position: "absolute",
      right: "-40px",
      top: "40%",
      zIndex: 1,
      cursor: "pointer",
    }}
    onClick={props.onClick}
  >
    <ArrowForwardIos />
  </Box>
);

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography
        sx={{
          letterSpacing: "6px",
          fontSize: "1rem",
          fontFamily: "Josefin Sans",
          my: 1,
          textAlign: "center",
        }}
      >
        ● ● ● ● ● ● ● ●
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        Our Reviews
      </Typography>
      <Typography
        align="center"
        sx={{ fontSize:{ xs: "1.5rem", md: "2rem"}, fontWeight: 600, mb: 4, fontFamily: "Josefin Sans" }}
      >
        What Our Customer Says
      </Typography>

      <Box maxWidth="lg" sx={{ mx: "auto" }}>
        <Slider {...settings}>
          {testimonials.map((item, idx) => (
            <Box key={idx} px={1}>
              {" "}
              {/* This adds spacing between slides */}
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  p: 3,
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography
                  sx={{ color: "custom.terracotta", fontSize: "1.2rem" }}
                >
                  {"★".repeat(item.rating)}
                </Typography>
                <Typography sx={{ mt: 2, mb: 3, height: "100px" }}>
                  {item.text}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2">{item.name}</Typography>
                  <FormatQuote
                    sx={{ color: "custom.terracotta", fontSize: "2rem" }}
                  />
                </Stack>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default TestimonialSlider;
