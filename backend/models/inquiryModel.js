// backend/models/inquiryModel.js
const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

// Function to fetch all inquiries
exports.getAllInquiries = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    return rows;
  } catch (error) {
    console.error('Database error, falling back to JSON file:', error.message);
    // Fallback to JSON file
    try {
      const jsonPath = path.join(__dirname, '..', 'data', 'inquiries.json');
      if (!fs.existsSync(jsonPath)) {
        return [];
      }
      const data = fs.readFileSync(jsonPath, 'utf8');
      return JSON.parse(data);
    } catch (jsonError) {
      console.error('Error reading JSON fallback:', jsonError);
      return [];
    }
  }
};

// Function to save a new inquiry
exports.saveInquiry = async (inquiryData) => {
  const details = inquiryData.message || inquiryData.details || '';
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.execute(
      'INSERT INTO inquiries (name, email, company, service, details, budget, timeline, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [
        inquiryData.name || '',
        inquiryData.email || '',
        inquiryData.company || '',
        inquiryData.service || '',
        details,
        inquiryData.budget || '',
        inquiryData.timeline || ''
      ]
    );

    await connection.commit();
    connection.release();
    return true;
  } catch (error) {
    console.error('Database error, falling back to JSON file:', error.message);
    // Fallback to JSON file
    try {
      const dataDir = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const jsonPath = path.join(dataDir, 'inquiries.json');
      let inquiries = [];

      try {
        if (fs.existsSync(jsonPath)) {
          const data = fs.readFileSync(jsonPath, 'utf8');
          inquiries = JSON.parse(data);
        }
      } catch (readError) {
        inquiries = [];
      }

      // Add new inquiry
      const newInquiry = {
        id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id || 0)) + 1 : 1,
        name: inquiryData.name || '',
        email: inquiryData.email || '',
        company: inquiryData.company || '',
        service: inquiryData.service || '',
        details: details,
        budget: inquiryData.budget || '',
        timeline: inquiryData.timeline || '',
        created_at: new Date().toISOString()
      };

      inquiries.push(newInquiry);
      fs.writeFileSync(jsonPath, JSON.stringify(inquiries, null, 2));
      console.log('Inquiry appended successfully to inquiries.json. Total:', inquiries.length);
      return true;
    } catch (jsonError) {
      console.error('Error saving to JSON fallback:', jsonError);
      throw new Error('Database and JSON fallback failed for saving inquiry.');
    }
  }
};
