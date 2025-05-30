import { Box, Container, Typography } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontFamily: "Josefin Sans", fontWeight: 600, mb: 4 }}>
        Terms & Conditions
      </Typography>

      <Typography variant="body1" sx={{ fontFamily: "Lato", mb: 3, lineHeight: 1.8 }}>
        These terms govern your use of our website and travel services. By accessing Three Degrees
        East, you agree to be bound by the following terms and conditions.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Bookings & Payments
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        A non-refundable deposit is required to secure your booking. The full balance must be paid
        60 days prior to departure. Payments can be made via secure online gateways or bank
        transfer.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Cancellation Policy
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        <ul>
          <li>Cancellations 60+ days before travel: Deposit forfeited</li>
          <li>30-59 days: 50% refund (excluding deposit)</li>
          <li>Less than 30 days: No refund</li>
        </ul>
        We recommend comprehensive travel insurance.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Health & Safety
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        You are responsible for ensuring you are physically fit for the retreat or tour. Please
        notify us of any medical conditions or dietary restrictions before travel.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Intellectual Property
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        All content on this site — including photos, videos, and text — is owned by Three Degrees
        East unless otherwise stated. Please do not reuse without written consent.
      </Typography>

      <Typography variant="body2" sx={{ fontFamily: "Lato", mt: 4 }}>
        Last updated: April 2025
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
