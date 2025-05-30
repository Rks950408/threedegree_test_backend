const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Save uploaded images to the public/images directory
    const uploadPath = path.join(__dirname, '../../../public/images/uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    // Accept only image files
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

// Path to content.json file
const contentFilePath = path.join(__dirname, '../../../public/content.json');

// Ensure content.json exists with default content
const ensureContentFile = () => {
  if (!fs.existsSync(contentFilePath)) {
    const defaultContent = {
      popup: {
        title: "UPCOMING RETREAT",
        content: "Join us for a transformative experience in the heart of India.",
        image: "/images/gallery/shakti.png"
      },
      about: {
        title: "ABOUT US",
        paragraph1: "Three Degrees East was born from a shared desire to reconnect — with self, with nature, and with India's deep-rooted traditions. We create soulful journeys that honour the sacred and celebrate the simple.",
        paragraph2: "Led by women and guided by purpose, our retreats offer more than escape — they invite transformation. With every step, chant, or meal, we hold space for reflection, healing, and the joy of rediscovery."
      },
      travel: {
        title: "TRAVEL",
        paragraph1: "India isn't just a destination — it's a deep exhale for your soul. Beyond the postcard-perfect Taj Mahal and colourful clichés, this is where ancient wisdom meets modern awakening. From Himalayan sunrises that still the mind to temple bells that stir the heart, every corner invites you to slow down, breathe deeper, and reconnect.",
        paragraph2: "Here, wellness isn't a trend — it's a way of life passed down through centuries of yoga, Ayurveda, and spiritual practice. Come for the culture, stay for the transformation. India doesn't just change your view — it changes you."
      },
      hero: {
        image: "/images/gallery/1.jpg"
      },
      overflow: {
        title1: "Music, Wind, Spirit Flow",
        title2: "Sounds Of India",
        description: "Mantra-Ghanta-Kirtan-Drizzle-Conch",
        image: "/images/gallery/6.jpg"
      }
    };
    
    fs.writeFileSync(contentFilePath, JSON.stringify(defaultContent, null, 2));
  }
};

// Initialize content file
ensureContentFile();

// Get all website content
router.get('/', async (req, res) => {
  try {
    if (!fs.existsSync(contentFilePath)) {
      ensureContentFile();
    }
    
    const contentData = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
    res.json(contentData);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ success: false, error: 'Error reading content data' });
  }
});

// Update a section of content
router.put('/:section', protect, async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;
    
    if (!fs.existsSync(contentFilePath)) {
      ensureContentFile();
    }
    
    const contentData = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
    
    // Update only the specified section
    if (Object.keys(contentData).includes(section)) {
      contentData[section] = { ...contentData[section], ...updateData };
      
      fs.writeFileSync(contentFilePath, JSON.stringify(contentData, null, 2));
      res.json({ success: true, data: contentData[section] });
    } else {
      res.status(404).json({ success: false, error: 'Section not found' });
    }
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ success: false, error: 'Error updating content data' });
  }
});

// Handle image upload
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image uploaded' });
    }
    
    // Create path relative to public folder for frontend access
    const imagePath = `/images/uploads/${req.file.filename}`;
    
    res.json({ 
      success: true, 
      filePath: imagePath
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, error: 'Error uploading image' });
  }
});

module.exports = router; 