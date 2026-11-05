// backend/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log('MySQL Pool Initialized for:', process.env.DB_HOST);

// Export the pool to be used in models/controllers
module.exports = pool;

// --- Initial Setup Check (Run once to create tables) ---

async function setupDatabase() {
  try {
    const connection = await pool.getConnection();

    // 1. Inquiries Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        budget VARCHAR(255),
        timeline VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // 2. Team Members Table (JSON for skills, social)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        bio TEXT,
        skills JSON,
        social JSON
      );
    `);
    
    // 3. Portfolio Projects Table (JSON for images, tech)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        description TEXT,
        images JSON,
        tech JSON,
        liveUrl VARCHAR(255),
        githubUrl VARCHAR(255),
        featured BOOLEAN DEFAULT FALSE
      );
    `);

    console.log('Database tables checked/created successfully.');
    connection.release();
  } catch (error) {
    console.error('Error setting up database tables:', error);
  }
}

// Call the setup function to ensure tables exist on startup
setupDatabase();