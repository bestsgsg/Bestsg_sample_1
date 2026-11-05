// backend/models/portfolioModel.js
const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

// Helper to parse JSON fields from DB result
const formatPortfolioProject = (project) => ({
  ...project,
  images: project.images ? JSON.parse(project.images) : [],
  tech: project.tech ? JSON.parse(project.tech) : [],
  featured: !!project.featured, // Convert tinyint(1) to boolean
});

// Function to fetch all portfolio projects
exports.getAllPortfolioProjects = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio_projects ORDER BY id ASC');
    return rows.map(formatPortfolioProject);
  } catch (error) {
    console.error('Database error, falling back to JSON file:', error.message);
    // Fallback to JSON file
    try {
      const jsonPath = path.join(__dirname, '..', 'data', 'portfolio.json');
      const data = fs.readFileSync(jsonPath, 'utf8');
      return JSON.parse(data);
    } catch (jsonError) {
      console.error('Error reading JSON fallback:', jsonError);
      throw new Error('Database and JSON fallback failed for portfolio projects.');
    }
  }
};

// Function to replace ALL portfolio projects (for sync simplicity)
exports.saveAllPortfolioProjects = async (projects) => {
  try {
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Delete all existing projects
    await connection.execute('DELETE FROM portfolio_projects');

    // 2. Insert new/updated projects
    for (const project of projects) {
      await connection.execute(
        `INSERT INTO portfolio_projects (id, title, category, description, images, tech, liveUrl, githubUrl, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          project.id, // Use frontend ID for re-insertion
          project.title,
          project.category,
          project.description,
          JSON.stringify(project.images),
          JSON.stringify(project.tech),
          project.liveUrl,
          project.githubUrl,
          project.featured,
        ]
      );
    }

    // Commit transaction
    await connection.commit();
    connection.release();

    return true;

  } catch (error) {
    console.error('Error saving portfolio projects:', error);
    // Rollback if anything fails
    if (connection) await connection.rollback();
    throw new Error('Database error during portfolio project save.');
  }
};