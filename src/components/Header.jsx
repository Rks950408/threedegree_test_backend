import {
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/4.png";
import logoText from "../assets/logo-text.png";

// Public navigation links
const publicNavLinks = [
  { label: "HOME", to: "/" },
  { label: "TRAVEL", to: "/travel" },
  { label: "ABOUT", to: "/about" },
  { label: "GALLERY", to: "/gallery" },
  // { label: "BLOG", to: "/blog" },
  { label: "SHOP", to: "/shop" },
  { label: "CONTACT", to: "/contact" },
];

// Admin navigation links - only include implemented admin pages
const adminNavLinks = [
  { label: "HOME", to: "/admin" },
  { label: "TRAVEL", to: "/admin/travel" },
  { label: "GALLERY", to: "/admin/gallery" },
  { label: "BLOG", to: "/admin/blog" },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [navLinks, setNavLinks] = useState(publicNavLinks);

  // Brand orange color
  const brandOrange = "custom.terracotta"; // Using the theme's custom color

  // Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAdmin(true);
      setNavLinks(adminNavLinks);
    } else {
      setIsAdmin(false);
      setNavLinks(publicNavLinks);
    }
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <RouterLink to={isAdmin ? "/admin" : "/"} onClick={handleDrawerToggle}>
          <Box
            component="img"
            src={logo}
            alt="Three Degrees East"
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </RouterLink>
      </Box>
      
      <List>
        {navLinks.map((link, index) => (
          <ListItem 
            key={index} 
            component={RouterLink} 
            to={link.to}
            onClick={handleDrawerToggle}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              py: 1.5,
              color: location.pathname === link.to ? brandOrange : "#fff",
              fontWeight: location.pathname === link.to ? "bold" : "normal",
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <ListItemText 
              primary={link.label} 
              sx={{ 
                textAlign: 'center',
                fontFamily: "Lato",
                letterSpacing: "0.05em", 
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        py: { xs: 1, md: 1 },
        textAlign: "center",
        width: "100%",
        height: { xs: "auto", md: "180px" },
        px: { xs: 2, md: 0 },
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Mobile menu hamburger icon */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: "#fff",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Logo */}
      <RouterLink 
        to={isAdmin ? "/admin" : "/"} 
        style={{ 
          textDecoration: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto'
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Three Degrees East"
          sx={{
            width: { xs: "120px", md: "140px" },
            height: { xs: "120px", md: "140px" },
            objectFit: "contain",
            display: 'block',
            mt: { xs: -2, md: -2 },
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 0.8,
              cursor: 'pointer'
            }
          }}
        />
      </RouterLink>

      {/* Title */}
      <Box
        component="img"
        src={logoText}
        alt="Three Degrees East"
        sx={{
          width: { xs: "auto", md: "280px" },
          height: { xs: "auto", md: "160px" },
          objectFit: "contain",
          mx: "auto",
          mt: { xs: -1, md: -2 }, 
        }}
      />

      {/* Nav Links - only shown on desktop */}
      {!isMobile && (
        <Stack
          direction="row"
          spacing={6}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mt: 1 }}
        >
          {navLinks.map((link, idx) => (
            <Button
              key={idx}
              component={RouterLink}
              to={link.to}
              sx={{
                fontFamily: "Lato",
                color: location.pathname === link.to ? brandOrange : "#fff",
                fontWeight: location.pathname === link.to ? "bold" : "normal",
                letterSpacing: "0.05em",
                fontSize: "1rem",
                minWidth: "auto",
                px: 1,
                position: "relative",
                "&::after": location.pathname === link.to ? {
                  content: '""',
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: brandOrange,
                } : {},
                "&:hover": {
                  color: brandOrange,
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      )}

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;
