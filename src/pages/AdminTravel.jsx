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
  Chip,
  Grid,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { Edit, Delete, Add, Visibility, AttachMoney, CloudUpload } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
// Import will be used when API functionality is implemented
// import axios from "axios";

const AdminTravel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [tabValue, setTabValue] = useState(0);
  
  // Sample data for development
  const [travelPackages, setTravelPackages] = useState([
    { 
      _id: '1', 
      title: 'Himalayan Trek', 
      location: 'Himachal Pradesh',
      duration: '7 days',
      price: 1299,
      description: 'Experience the majestic Himalayas with our guided trek package. Includes accommodations, meals, and experienced guides.',
      imagePath: '/images/gallery/5.jpg', 
      status: 'Active',
      featured: true,
      createdAt: '2023-05-10T08:30:00Z'
    },
    { 
      _id: '2', 
      title: 'Goa Beach Retreat', 
      location: 'Goa',
      duration: '5 days',
      price: 899,
      description: 'Relax on the beautiful beaches of Goa. Package includes beachfront accommodations, daily breakfast, and a sunset cruise.',
      imagePath: '/images/gallery/6.jpg', 
      status: 'Active',
      featured: false,
      createdAt: '2023-06-22T11:45:00Z'
    },
    { 
      _id: '3', 
      title: 'Rajasthan Desert Safari', 
      location: 'Jaisalmer',
      duration: '6 days',
      price: 1099,
      description: 'Explore the Thar Desert on camelback and stay in luxury desert camps. Experience traditional Rajasthani culture and cuisine.',
      imagePath: '/images/gallery/7.jpg', 
      status: 'Draft',
      featured: false,
      createdAt: '2023-07-15T09:20:00Z'
    },
  ]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setIsLoggedIn(true);
      // In a production app, fetch travel packages from API here
      // fetchTravelPackages();
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch travel packages from API (commented out since we're using sample data)
  /*
  const fetchTravelPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/travel');
      if (response.data) {
        setTravelPackages(response.data);
      }
    } catch (error) {
      console.error('Error fetching travel packages:', error);
      showAlert('Failed to load travel packages. Please try again.', 'error');
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

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
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

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Open dialog
  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setTitle(item.title);
      setLocation(item.location);
      setDuration(item.duration);
      setPrice(String(item.price));
      setDescription(item.description);
      setStatus(item.status);
      setPreviewUrl(item.imagePath);
    } else {
      setCurrentItem(null);
      setTitle("");
      setLocation("");
      setDuration("");
      setPrice("");
      setDescription("");
      setStatus("Active");
      setPreviewUrl("");
      setSelectedFile(null);
    }
    setOpenDialog(true);
    setTabValue(0);
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
      if (!title || !location || !duration || !price) {
        showAlert('Please fill in all required fields', 'error');
        return;
      }
      
      setLoading(true);
      
      // Upload image if a file is selected
      let imagePath = currentItem?.imagePath || '/images/gallery/5.jpg';
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
        await axios.put(`http://localhost:5001/api/travel/${currentItem._id}`, {
          title,
          location,
          duration,
          price: Number(price),
          description,
          status,
          imagePath
        }, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        */
        
        const updatedItems = travelPackages.map(item => 
          item._id === currentItem._id ? { 
            ...item, 
            title,
            location,
            duration,
            price: Number(price),
            description,
            status,
            imagePath
          } : item
        );
        setTravelPackages(updatedItems);
        showAlert('Travel package updated successfully');
      } else {
        // Add new item
        // In a real app, this would call the API
        /*
        const response = await axios.post('http://localhost:5001/api/travel', {
          title,
          location,
          duration,
          price: Number(price),
          description,
          status,
          imagePath
        }, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        const newPackage = response.data;
        */
        
        const newItem = {
          _id: String(Math.max(...travelPackages.map(item => Number(item._id))) + 1),
          title,
          location,
          duration,
          price: Number(price),
          description,
          imagePath,
          status,
          featured: false,
          createdAt: new Date().toISOString()
        };
        setTravelPackages([...travelPackages, newItem]);
        showAlert('Travel package added successfully');
      }
    } catch (error) {
      console.error('Error saving travel package:', error);
      showAlert('Failed to save travel package', 'error');
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this travel package?")) {
      try {
        setLoading(true);
        
        // In a real app, this would call the API
        /*
        await axios.delete(`http://localhost:5001/api/travel/${id}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
          }
        });
        */
        
        setTravelPackages(travelPackages.filter(item => item._id !== id));
        showAlert('Travel package deleted successfully');
      } catch (error) {
        console.error('Error deleting travel package:', error);
        showAlert('Failed to delete travel package', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  // View travel package
  const handleViewPackage = () => {
    // In a real app, this would navigate to the public package page
    window.open('/travel', '_blank');
  };

  // Toggle featured status
  const handleToggleFeatured = (id) => {
    const updatedItems = travelPackages.map(item => 
      item._id === id ? { ...item, featured: !item.featured } : item
    );
    setTravelPackages(updatedItems);
    const item = updatedItems.find(item => item._id === id);
    showAlert(`Package ${item.featured ? 'marked as featured' : 'removed from featured'}`);
  };

  if (!isLoggedIn) {
    return null; // Redirect happens in useEffect
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Travel Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add New Travel Package
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
                <TableCell>Location</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {travelPackages.length > 0 ? (
                travelPackages.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>{formatPrice(item.price)}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: item.status === 'Active' ? '#e6f7e6' : '#f7e6e6',
                          color: item.status === 'Active' ? '#2e7d32' : '#7d2e2e',
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
                      <Chip
                        label={item.featured ? "Featured" : "Not Featured"}
                        color={item.featured ? "success" : "default"}
                        size="small"
                        onClick={() => handleToggleFeatured(item._id)}
                        sx={{ cursor: 'pointer' }}
                      />
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
                        onClick={() => handleViewPackage()}
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
                  <TableCell colSpan={8} align="center">
                    No travel packages found
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
          {currentItem ? "Edit Travel Package" : "Add Travel Package"}
        </DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="package tabs">
            <Tab label="Basic Info" />
            <Tab label="Description" />
            <Tab label="Image" />
          </Tabs>
        </Box>
        <DialogContent dividers>
          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  required
                  margin="normal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  required
                  margin="normal"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  required
                  margin="normal"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 7 days"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  required
                  type="number"
                  margin="normal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 1 && (
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={10}
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the travel package in detail..."
            />
          )}
          
          {tabValue === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  mb: 3,
                  width: '100%',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '260px', borderRadius: '4px' }}
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
                Upload Featured Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Recommended image size: 1200 x 800 pixels
              </Typography>
            </Box>
          )}
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

export default AdminTravel; 