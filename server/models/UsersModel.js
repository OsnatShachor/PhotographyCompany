const pool = require('../DB.js');
async function getUserByEmail(email) {
    try {
      const sql = 'SELECT * from users WHERE users.email=?';
      const [rows, fields] = await pool.query(sql, [email]);
      console.log(`model=> ${rows}`)
      return rows;
    } catch (err) {
      throw(err);
    }
  }

async function createUser(userName,email,phone,roleID, cryptedPassword) {
    try {
      const sql = `INSERT INTO users (userName,email,phone,roleID) values(?,?,?,?)`;
      const [resultUser] = await pool.query(sql, [userName,email,phone,roleID]);
      const userId = resultUser.insertId;
      console.log("userModel userId "+userId)
      const sqlPassword = `INSERT INTO passwords (userID, password) values(?, ?)`;
      const [result] = await pool.query(sqlPassword, [userId, cryptedPassword]);
      return {userId, userName, email, phone, roleID};
    }
    catch (err) {
      throw(err);
    }
  }

module.exports = { createUser,getUserByEmail }  
