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
  SELECT  categoryName,  payPerHour, numOfEditPictures
  FROM category
  WHERE photographerId = ?
`;
    const [rows] = await pool.query(sql, [photographerId]);
    // console.log("model-category=>" + JSON.stringify(rows))
    return rows;
  } catch (err) {
    return (err);
  }
}

async function getInformation(photographerId) {
  try {
    const sql = `
  SELECT aboutME
  FROM photographers
  WHERE photographerId = ?
`;
    const [rows] = await pool.query(sql, [photographerId]);
    console.log("model=>info" + JSON.stringify(rows))
    return rows;
  } catch (err) {
    return (err);
  }
}

module.exports = { getAllPhotographers, getInformation,getCategory }  
