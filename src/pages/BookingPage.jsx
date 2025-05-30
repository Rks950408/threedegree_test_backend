import { Container, Typography, Box } from '@mui/material';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'custom.terracotta',
          py: { xs: 4, md: 6 },
          mt: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mb: { xs: 4, md: 6 }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Josefin Sans',
            fontWeight: 600,
            fontSize: { xs: '22px', sm: '26px', md: '42px' },
            color: '#fff',
            mb: 2,
          }}
        >
          Book Your Dharamshala Retreat
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: { xs: '14px', sm: '15px', md: '18px' },
            color: '#fff',
            maxWidth: { xs: '85%', md: '800px' },
            mx: 'auto',
            px: { xs: 2, md: 0 },
            mb: 0
          }}
        >
          Secure your spot for this transformative journey in the Himalayan foothills
        </Typography>
      </Box>

      {/* Booking Form Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <BookingForm />
      </Box>
    </Container>
  );
};

export default BookingPage; 