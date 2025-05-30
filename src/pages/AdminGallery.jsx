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
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete, Add, CloudUpload } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
// Import will be used when API functionality is implemented
// import axios from "axios";

const AdminGallery = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  
  // Sample data for development
  const [galleryItems, setGalleryItems] = useState([
    { _id: '1', title: 'Mountain View', imagePath: '/images/gallery/1.jpg', order: 1, isActive: true },
    { _id: '2', title: 'Beach Sunset', imagePath: '/images/gallery/2.jpg', order: 2, isActive: true },
    { _id: '3', title: 'Forest Trail', imagePath: '/images/gallery/3.jpg', order: 3, isActive: true },
    { _id: '4', title: 'Desert Landscape', imagePath: '/images/gallery/4.jpg', order: 4, isActive: false },
  ]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setIsLoggedIn(true);
      // In a production app, fetch gallery items from API here
      // fetchGalleryItems();
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch gallery items from API (commented out since we're using sample data)
  /*
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/gallery');
      if (response.data) {
        setGalleryItems(response.data);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      showAlert('Failed to load gallery items. Please try again.', 'error');
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
      setOrder(item.order);
      setIsActive(item.isActive);
      setPreviewUrl(item.imagePath);
    } else {
      setCurrentItem(null);
      setTitle("");
      setOrder(galleryItems.length + 1);
      setIsActive(true);
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
      let imagePath = currentItem?.imagePath || '/images/gallery/1.jpg';
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
        await axios.put(`http://localhost:5001/api/gallery/${currentItem._id}`, {
          title,
          order,
          isActive,
          imagePath
        }, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        */
        
        const updatedItems = galleryItems.map(item => 
          item._id === currentItem._id ? { 
            ...item, 
            title, 
            order, 
            isActive,
            imagePath
          } : item
        );
        setGalleryItems(updatedItems);
        showAlert('Gallery item updated successfully');
      } else {
        // Add new item
        // In a real app, this would call the API
        /*
        const response = await axios.post('http://localhost:5001/api/gallery', {
          title,
          order,
          isActive,
          imagePath
        }, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        const newGalleryItem = response.data;
        */
        
        const newItem = {
          _id: String(Math.max(...galleryItems.map(item => Number(item._id))) + 1),
          title,
          imagePath,
          order,
          isActive
        };
        setGalleryItems([...galleryItems, newItem]);
        showAlert('Gallery item added successfully');
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      showAlert('Failed to save gallery item', 'error');
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        setLoading(true);
        
        // In a real app, this would call the API
        /*
        await axios.delete(`http://localhost:5001/api/gallery/${id}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        */
        
        setGalleryItems(galleryItems.filter(item => item._id !== id));
        showAlert('Gallery item deleted successfully');
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        showAlert('Failed to delete gallery item', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isLoggedIn) {
    return null; // Redirect happens in useEffect
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gallery Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add New Image
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
                <TableCell>Image</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleryItems.length > 0 ? (
                galleryItems.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <img
                        src={item.imagePath}
                        alt={item.title}
                        style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                      />
                    </TableCell>
                    <TableCell>{item.order}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: item.isActive ? '#e6f7e6' : '#f7e6e6',
                          color: item.isActive ? '#2e7d32' : '#7d2e2e',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: 1,
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.isActive ? "Active" : "Inactive"}
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
                  <TableCell colSpan={6} align="center">
                    No gallery items found
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
          {currentItem ? "Edit Gallery Item" : "Add Gallery Item"}
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              pt: 1,
            }}
          >
            {/* Left: Form Fields */}
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Display Order"
                type="number"
                margin="normal"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                helperText="Lower numbers will be displayed first"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    color="primary"
                  />
                }
                label="Active (visible on website)"
                sx={{ mt: 2, display: 'block' }}
              />
            </Box>
            
            {/* Right: Image Upload */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>
                Gallery Image
              </Typography>
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                  width: '100%',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '4px' }}
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
          </Box>
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

export default AdminGallery; 