// backend/models/teamModel.js
const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

// Helper to parse JSON fields from DB result
const formatTeamMember = (member) => ({
  ...member,
  skills: member.skills ? (typeof member.skills === 'string' ? JSON.parse(member.skills) : member.skills) : [],
  social: member.social ? (typeof member.social === 'string' ? JSON.parse(member.social) : member.social) : { linkedin: '', twitter: '', github: '' },
});

// Function to fetch all team members
exports.getAllTeamMembers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM team_members ORDER BY id ASC');
    return rows.map(formatTeamMember);
  } catch (error) {
    console.error('Database error fetching team members, falling back to JSON:', error.message);
    try {
      const jsonPath = path.join(__dirname, '..', 'data', 'team.json');
      if (fs.existsSync(jsonPath)) {
        const data = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(data);
      }
      return [];
    } catch (jsonErr) {
      console.error('Error reading team.json fallback:', jsonErr);
      return [];
    }
  }
};

// Function to replace ALL team members (for sync simplicity)
exports.saveAllTeamMembers = async (members) => {
  let connection;
  try {
    // Start transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Delete all existing members
    await connection.execute('DELETE FROM team_members');

    // 2. Insert new/updated members
    for (const member of members) {
      await connection.execute(
        `INSERT INTO team_members (id, name, title, image, bio, skills, social)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          member.id,
          member.name,
          member.title,
          member.image,
          member.bio,
          JSON.stringify(member.skills || []),
          JSON.stringify(member.social || {}),
        ]
      );
    }

    // Commit transaction
    await connection.commit();
    connection.release();
    return true;
  } catch (error) {
    console.error('Database error saving team members, saving to JSON fallback:', error.message);
    if (connection) {
      try { await connection.rollback(); } catch {}
      try { connection.release(); } catch {}
    }
    try {
      const jsonPath = path.join(__dirname, '..', 'data', 'team.json');
      fs.writeFileSync(jsonPath, JSON.stringify(members, null, 2));
      return true;
    } catch (jsonErr) {
      console.error('Error writing team.json fallback:', jsonErr);
      throw new Error('Database and JSON fallback failed for team save.');
    }
  }
};
