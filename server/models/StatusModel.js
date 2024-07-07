const pool = require('../DB.js');


async function getStatus(statusID) {
    try {
      const sql = `
         SELECT *
         FROM statuses
         WHERE statusID = ?
      `;
      const [rows] = await pool.query(sql, [statusID]);
      return rows;
    } catch (err) {
      return (err);
    }
  }


module.exports = { getStatus }  
