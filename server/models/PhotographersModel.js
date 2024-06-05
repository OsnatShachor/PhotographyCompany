const pool = require('../DB.js');
async function getAllPhotographers() {
  try {
    const sql = `
      SELECT u.*
      FROM users u
      JOIN photographers p ON u.userID = p.photographerID
      WHERE p.isActive = TRUE
  `;
    const [rows, fields] = await pool.query(sql);
    console.log("model=>" + JSON.stringify(rows))
    return rows;
  } catch (err) {
    return(err);
  }
}

module.exports = { getAllPhotographers }  
