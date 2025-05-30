import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

const BlogDetail = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }
      }}
    >
      {/* Header with title and close button */}
      <DialogTitle
        sx={{
          p: 3,
          fontFamily: "Josefin Sans",
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "2rem" },
          color: "#1C1C1C",
        }}
      >
        {blog.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "grey.500",
            backgroundColor: "rgba(0,0,0,0.05)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Blog content */}
      <DialogContent dividers sx={{ p: { xs: 2, md: 4 } }}>
        {/* Featured image */}
        <Box sx={{ mb: 3 }}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              borderRadius: "8px",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Content */}
        <Box 
          dangerouslySetInnerHTML={{ __html: blog.content }}
          sx={{
            "& h2": {
              fontFamily: "Josefin Sans",
              fontWeight: 600,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              color: "#1C1C1C",
              mt: 4,
              mb: 2,
            },
            "& h3": {
              fontFamily: "Josefin Sans",
              fontWeight: 600,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "#1C1C1C",
              mt: 3,
              mb: 2,
            },
            "& p": {
              fontFamily: "Lato",
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.8,
              color: "#1C1C1C",
              opacity: 0.9,
              mb: 2,
            },
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              my: 3,
            }
          }}
        />

        {/* Download button */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              backgroundColor: "custom.terracotta",
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: "4px",
              fontWeight: 500,
              textTransform: "none",
              fontFamily: "Lato",
              "&:hover": {
                backgroundColor: "#b04a26",
              },
            }}
          >
            Download as PDF
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetail; 