const pool = require('../DB.js');
async function getAllPhotographers() {
    try {
      const sql = 'SELECT * FROM photographers where isActive=TRUE';
      const [rows,fields] = await pool.query(sql);
      console.log("model=>" +rows)
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  async function createUser(username, cryptedPassword) {
    try {
        const sql = `INSERT INTO users (username) values(?)`;
        const [resultUser] = await pool.query(sql,[username]);
        const userId = resultUser[0][0];
        console.log(userId)
        const sqlPassword = `INSERT INTO passwords (userId, password) values(?, ?)`;
        const [result] = await pool.query(sqlPassword,[userId,cryptedPassword]);
        return userId;
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {getAllPhotographers  }  
