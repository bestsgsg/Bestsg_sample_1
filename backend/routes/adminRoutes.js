// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

// --- PUBLIC ROUTES (used by frontend for data fetching) ---
router.get('/get_inquiries', controller.getInquiries); // UPDATED

router.get('/get_team', controller.getTeamMembers);     // UPDATED
router.get('/get_portfolio', controller.getPortfolioProjects); // UPDATED

// --- ADMIN ROUTES (used by AdminDashboard for updates) ---

// Login
router.post('/login', controller.adminLogin); // UPDATED

// Save Team Members
router.post('/save_team', controller.saveTeamMembers); // UPDATED

// Save Portfolio Projects
router.post('/save_portfolio', controller.savePortfolioProjects); // UPDATED

// Image Upload
router.post('/upload_image', controller.uploadImage, controller.handleImageUpload); // UPDATED

module.exports = router;