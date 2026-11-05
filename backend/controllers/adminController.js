// backend/controllers/adminController.js
const teamModel = require('../models/teamModel');
const portfolioModel = require('../models/portfolioModel');
const inquiryModel = require('../models/inquiryModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Mock Admin Token (in a real app, use JWT)
const MOCK_ADMIN_TOKEN = 'admin-jwt-token-12345';

// --- File Upload Setup (Multer) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to 'backend/uploads'
  },
  filename: (req, file, cb) => {
    // Use the memberId from the form body to name the file
    const memberId = req.body.memberId || Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `member-${memberId}${ext}`);
  },
});

exports.uploadImage = multer({ storage: storage }).single('image');

// --- Middleware/Helper ---

// Convert backend path to client-accessible URL
const getImageUrl = (filename) => {
    // Assumes backend is running on http://localhost:5000 and uploads are served from /uploads
    return `http://localhost:${process.env.PORT || 5000}/uploads/${filename}`;
};

// --- Controller Functions ---

// 1. Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: MOCK_ADMIN_TOKEN
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};

// 2. Image Upload
exports.handleImageUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    // The image path saved in the DB should be the URL the client uses to retrieve it
    const imagePath = getImageUrl(req.file.filename);

    // Clean up old file if member ID was provided and a new file was saved
    const memberId = req.body.memberId;
    if (memberId) {
        // Simple logic: delete all files starting with `member-ID` that are NOT the current file
        fs.readdir(uploadDir, (err, files) => {
            if (err) console.error("Error reading upload directory for cleanup:", err);

            files.forEach(file => {
                if (file.startsWith(`member-${memberId}`) && file !== req.file.filename) {
                    fs.unlink(path.join(uploadDir, file), (unlinkErr) => {
                        if (unlinkErr) console.error("Error cleaning up old file:", unlinkErr);
                    });
                }
            });
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Image uploaded successfully.',
        imagePath: imagePath
    });
};

// 3. Get Inquiries
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await inquiryModel.getAllInquiries();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Get Team Members
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await teamModel.getAllTeamMembers();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Save Team Members
exports.saveTeamMembers = async (req, res) => {
  try {
    const members = req.body;
    await teamModel.saveAllTeamMembers(members);
    res.status(200).json({ success: true, message: 'Team members saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Get Portfolio Projects
exports.getPortfolioProjects = async (req, res) => {
  try {
    const projects = await portfolioModel.getAllPortfolioProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Save Portfolio Projects
exports.savePortfolioProjects = async (req, res) => {
  try {
    const projects = req.body;
    await portfolioModel.saveAllPortfolioProjects(projects);
    res.status(200).json({ success: true, message: 'Portfolio projects saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};