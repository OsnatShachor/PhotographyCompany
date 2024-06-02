const pool = require('../DB');
async function getAllPhotographers() {
    try {
      const sql = 'SELECT * FROM users where roleID=2';
      const [rows, fields] = await pool.query(sql);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
module.exports = {getAllPhotographers  }  
