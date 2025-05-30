import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete, Add, Visibility, CloudUpload } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
// Import will be used when API functionality is implemented
// import axios from "axios";

const AdminBlog = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  
  // Sample data for development
  const [blogs, setBlogs] = useState([
    { 
      _id: '1', 
      title: 'Dharamshala Journey', 
      excerpt: 'A spiritual journey through Dharamshala...',
      content: 'Dharamshala is a beautiful city located in the Indian state of Himachal Pradesh. It is well known for its scenic beauty and as the residence of the Dalai Lama.',
      imagePath: '/images/gallery/3.jpg', 
      status: 'Published',
      createdAt: '2023-06-15T10:30:00Z'
    },
    { 
      _id: '2', 
      title: 'Kerala Backwaters', 
      excerpt: 'Exploring the serene backwaters of Kerala...',
      content: 'Kerala, known as "God\'s Own Country", is famous for its backwaters. The tranquil boat rides through the palm-fringed canals offer a unique experience.',
      imagePath: '/images/gallery/4.jpg', 
      status: 'Draft',
      createdAt: '2023-07-22T14:45:00Z'
    },
    { 
      _id: '3', 
      title: 'Taj Mahal: A Monument of Love', 
      excerpt: 'The story behind the iconic Taj Mahal...',
      content: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
      imagePath: '/images/gallery/5.jpg', 
      status: 'Published',
      createdAt: '2023-08-10T09:15:00Z'
    },
  ]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setIsLoggedIn(true);
      // In a production app, fetch blogs from API here
      // fetchBlogs();
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch blogs from API (commented out since we're using sample data)
  /*
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/blogs');
      if (response.data) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showAlert('Failed to load blogs. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };
  */

  // Show alert message
  const showAlert = (message, severity = 'success') => {
    setAlert({
      open: true,
      message,
      severity
    });
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlert({...alert, open: false});
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle file select for image upload
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Open dialog
  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setTitle(item.title);
      setExcerpt(item.excerpt);
      setContent(item.content);
      setStatus(item.status);
      setPreviewUrl(item.imagePath);
    } else {
      setCurrentItem(null);
      setTitle("");
      setExcerpt("");
      setContent("");
      setStatus("Draft");
      setPreviewUrl("");
      setSelectedFile(null);
    }
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
    setPreviewUrl('');
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedFile) return null;
    
    try {
      // In a real app, this would upload to server
      // For now, we'll simulate the upload by returning the preview URL
      
      // Example server upload code:
      /*
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
        }
      });
      
      return response.data.imagePath;
      */
      
      return previewUrl; // For demo purposes
    } catch (error) {
      console.error('Error uploading image:', error);
      showAlert('Failed to upload image', 'error');
      return null;
    }
  };

  // Save item
  const handleSaveItem = async () => {
    try {
      setLoading(true);
      
      // Upload image if a file is selected
      let imagePath = currentItem?.imagePath || '/images/gallery/3.jpg';
      if (selectedFile) {
        const uploadedImagePath = await handleImageUpload();
        if (uploadedImagePath) {
          imagePath = uploadedImagePath;
        }
      }
      
      if (currentItem) {
        // Update existing item
        // In a real app, this would call the API
        /*
        await axios.put(`http://localhost:5001/api/blogs/${currentItem._id}`, {
          title,
          excerpt,
          content,
          status,
          imagePath
        }, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        */
        
        const updatedItems = blogs.map(item => 
          item._id === currentItem._id ? { 
            ...item, 
            title,
            excerpt,
            content, 
            status,
            imagePath
          } : item
        );
        setBlogs(updatedItems);
        showAlert('Blog post updated successfully');
      } else {
        // Add new item
        // In a real app, this would call the API
        /*
        const response = await axios.post('http://localhost:5001/api/blogs', {
          title,
          excerpt,
          content,
          status,
          imagePath
        }, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        const newBlog = response.data;
        */
        
        const newItem = {
          _id: String(Math.max(...blogs.map(item => Number(item._id))) + 1),
          title,
          excerpt,
          content,
          imagePath,
          status,
          createdAt: new Date().toISOString()
        };
        setBlogs([...blogs, newItem]);
        showAlert('Blog post created successfully');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      showAlert('Failed to save blog post', 'error');
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        setLoading(true);
        
        // In a real app, this would call the API
        /*
        await axios.delete(`http://localhost:5001/api/blogs/${id}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        */
        
        setBlogs(blogs.filter(item => item._id !== id));
        showAlert('Blog post deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
        showAlert('Failed to delete blog post', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  // View blog
  const handleViewBlog = () => {
    // In a real app, this would navigate to the public blog page
    window.open('/blog', '_blank');
  };

  if (!isLoggedIn) {
    return null; // Redirect happens in useEffect
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add New Blog Post
        </Button>
      </Box>

      {/* Alert for notifications */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      {loading && !openDialog ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Excerpt</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.length > 0 ? (
                blogs.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.excerpt.substring(0, 30)}...</TableCell>
                    <TableCell>
                      <img
                        src={item.imagePath}
                        alt={item.title}
                        style={{ width: "100px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                      />
                    </TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: item.status === 'Published' ? '#e6f7e6' : '#f7f7e6',
                          color: item.status === 'Published' ? '#2e7d32' : '#7d7d2e',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: 1,
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(item)}
                        title="Edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleViewBlog()}
                        title="View"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small"
                        color="error" 
                        onClick={() => handleDeleteItem(item._id)}
                        title="Delete"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No blog posts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentItem ? "Edit Blog Post" : "Add Blog Post"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Left Column - Form Fields */}
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Excerpt"
                margin="normal"
                multiline
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
              <TextField
                fullWidth
                label="Content"
                margin="normal"
                multiline
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Right Column - Image Upload */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Featured Image
                </Typography>
                <Box
                  sx={{
                    border: '1px dashed #ccc',
                    borderRadius: 1,
                    py: 2,
                    px: 1,
                    mb: 2,
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No image selected
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUpload />}
                  sx={{
                    backgroundColor: "#D07850",
                    "&:hover": {
                      backgroundColor: "#a54825",
                    },
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#D07850",
              "&:hover": {
                backgroundColor: "#a54825",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminBlog; 