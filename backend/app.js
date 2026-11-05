// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const adminRoutes = require('./routes/adminRoutes');
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for frontend communication
const allowedOrigins = [
    'http://www.best-sg.com',
    'https://www.best-sg.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:8880',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes ---
// Inquiry submission route (before adminRoutes to take precedence)
app.post('/backend/save_inquiry', async (req, res) => {
  console.log('save_inquiry route hit with data:', JSON.stringify(req.body, null, 2));
  try {
    const inquiryData = req.body;

    // Save inquiry using the model (database with JSON fallback)
    await require('./models/inquiryModel').saveInquiry(inquiryData);
    console.log('Inquiry saved successfully');

    // Send notification email
    try {
      const emailService = require('./utils/emailService');
      await emailService.sendInquiryNotification(inquiryData);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.log('Email failed but inquiry saved:', emailError.message);
    }

    res.status(200).json({ success: true, message: 'Inquiry submitted successfully.' });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    res.status(500).json({ message: 'Failed to process inquiry. Please try again.' });
  }
});

// Map the base /backend path to the admin routes
app.use('/backend', adminRoutes);

// Diagnostic test route
app.post('/backend/test', (req, res) => {
  console.log('TEST ROUTE HIT!');
  res.status(200).json({ message: 'Test success!' });
});

app.get('/', (req, res) => {
  res.send('Node.js Express Backend is running!');
});

// Production static file serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the backend at http://localhost:${PORT}`);
});
