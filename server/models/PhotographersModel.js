const pool = require('../DB.js');
async function getAllPhotographers() {
  try {
    const sql = `
      SELECT u.*
      FROM users u
      JOIN photographers p ON u.userID = p.photographerID
      WHERE p.isActive = TRUE
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
     console.log("model-category=>" + JSON.stringify(rows))
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
    console.log("model=>getInformation" + JSON.stringify(rows[0]))
    return rows[0];
  } catch (err) {
    return (err);
  }
}

module.exports = { getAllPhotographers, getInformation,getCategory }  
