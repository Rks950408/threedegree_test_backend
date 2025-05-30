import { Box, Container, Typography } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontFamily: "Josefin Sans", fontWeight: 600, mb: 4 }}>
        Privacy Policy
      </Typography>

      <Typography variant="body1" sx={{ fontFamily: "Lato", mb: 3, lineHeight: 1.8 }}>
        At Three Degrees East, your privacy is important to us. This Privacy Policy outlines how we
        collect, use, and safeguard your information when you use our services or website.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Information We Collect
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        We may collect personal data such as your name, email, contact number, and travel
        preferences when you:
        <ul>
          <li>Submit a booking inquiry</li>
          <li>Sign up for our newsletter</li>
          <li>Contact us via the website or social media</li>
        </ul>
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        How We Use Your Data
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        Your information helps us to:
        <ul>
          <li>Provide personalised travel experiences</li>
          <li>Respond to your queries efficiently</li>
          <li>Send relevant updates or promotional content</li>
        </ul>
        We do not sell your data to third parties.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Data Security
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        We take reasonable precautions to protect your data using encrypted communication,
        restricted access, and secure storage systems.
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", mt: 4, mb: 2 }}>
        Your Rights
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Lato", lineHeight: 1.8 }}>
        Under the UK GDPR and Data Protection Act 2018, you have the right to access, modify, or
        delete your personal data at any time. Email us at
        <strong> namaste@threedegreeseast.com</strong> for such requests.
      </Typography>

      <Typography variant="body2" sx={{ fontFamily: "Lato", mt: 4 }}>
        Last updated: April 2025
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
