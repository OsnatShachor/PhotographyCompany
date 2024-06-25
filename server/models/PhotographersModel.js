const pool = require('../DB.js');
async function getAllActivePhotographers() {
  try {
    const sql = `
    SELECT u.*
    FROM users u
    JOIN photographers p ON u.userID = p.photographerID
    WHERE u.roleID = 2 AND p.isActive = TRUE;
  `;
    const [rows] = await pool.query(sql);
    return rows;
  } catch (err) {
    return (err);
  }
}
async function getCategory(photographerId) {
  try {
    const sql = `
       SELECT *
       FROM category
       WHERE photographerId = ?
    `;
    const [rows] = await pool.query(sql, [photographerId]);
    return rows;
  } catch (err) {
    return (err);
  }
}

async function getInformation(photographerId) {
  try {
    const sql = `
   SELECT aboutMe
   FROM photographers
   WHERE photographerId = ?
    `;
    const [rows] = await pool.query(sql, [photographerId]);
    console.log("model get information "+JSON.stringify(rows[0]));
    return rows[0];
  } catch (err) {
    return (err);
  }
}

module.exports = { getAllActivePhotographers, getInformation, getCategory }  
