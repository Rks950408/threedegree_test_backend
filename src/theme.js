// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ce531f', // Red
    },
    secondary: {
      main: '#50433d', // Dark Brown
    },
    background: {
      default: "#e6d9c6", // Beige
      paper: '#cbbeae',   // Light Taupe
    },
    text: {
      primary: '#50433d',
    },
    custom: {
      beige: '#e6d9c6',
      red: '#ce531f',
      darkBrown: '#50433d',
      terracotta: '#d07850',
      lightTaupe: '#cbbeae',
    },
  },
  typography: {
    fontFamily: `'Josefin Sans', 'Lato', 'sans-serif'`,
    h1: {
      fontFamily: `'Montserrat', 'Fira Sans', 'sans-serif'`,
    },
    h2: {
      fontFamily: `'Montserrat', 'Fira Sans', 'sans-serif'`,
    },
    brittany: {
      fontFamily: `'Brittany Signature', cursive`,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#50433d',
            borderWidth: '2px',
          },
        },
      },
    },
  },
});

export default theme;
