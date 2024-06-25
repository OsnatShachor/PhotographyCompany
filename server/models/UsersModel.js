const pool = require('../DB.js');
async function getUserByEmail(email) {
  try {
    const sql = 'SELECT * from users WHERE users.email=?';
    const [rows, fields] = await pool.query(sql, [email]);
    console.log(`model=> ${rows}`)
    return rows;
  } catch (err) {
    throw (err);
  }
}
async function checkRelation(userId,photographerId) {
  try {
    const sql = 'SELECT * FROM relations WHERE clientID = ? AND photographerID= ?';
    const [rows] = await pool.query(sql, [userId,photographerId]);
    return rows;
  } catch (err) {
    throw err;
  }
}
async function createRelation(userId,photographerId) {
  try {
    const sqlRelations = `INSERT INTO relations (photographerID,clientID) values(?,?)`;
    const [relation] = await pool.query(sqlRelations, [photographerId, userId]);
    return relation;
  } catch (err) {
    throw err;
  }
}
async function getPasswordByUserId(userId) {
  try {
    const sql = 'SELECT password FROM passwords WHERE userID = ?';
    const [rows] = await pool.query(sql, [userId]);
    return rows;
  } catch (err) {
    throw err;
  }
}
async function getUserByUserId(userId) {
  try {
    const sql = 'SELECT * FROM users WHERE userID = ?';
    const [rows] = await pool.query(sql, [userId]);
    return rows;
  } catch (err) {
    throw err;
  }
}
async function createUser(userName, email, phone, roleID, cryptedPassword) {
  try {
    const sql = `INSERT INTO users (userName,email,phone,roleID) values(?,?,?,?)`;
    const [resultUser] = await pool.query(sql, [userName, email, phone, roleID]);
    const userId = resultUser.insertId;
    console.log("userModel userId " + userId)
    const sqlPassword = `INSERT INTO passwords (userID, password) values(?, ?)`;
    const [result] = await pool.query(sqlPassword, [userId, cryptedPassword]);
    return { userId, userName, email, phone, roleID };
  }
  catch (err) {
    throw (err);
  }
}
async function createClient(photographerId, userName, email, phone, roleID, cryptedPassword) {
  try {
    console.log(photographerId)
    const sql = `INSERT INTO users (userName,email,phone,roleID) values(?,?,?,?)`;
    const [resultUser] = await pool.query(sql, [userName, email, phone, roleID]);
    console.log("hhhh")
    const userId = resultUser.insertId;
    console.log("userModel userId " + userId)
    const sqlPassword = `INSERT INTO passwords (userID, password) values(?, ?)`;
    const [result] = await pool.query(sqlPassword, [userId, cryptedPassword]);
    const relations = checkRelation(userId,photographerId)
    //  const sqlRelations = `INSERT INTO relations (photographerID,clientID) values(?,?)`;
    // const [resultClient] = await pool.query(sqlRelations, [photographerId, userId]);
   return { userId, userName, email, phone, roleID };
  }
  catch (err) {
    throw (err);
  }
}
module.exports = { createUser, getUserByEmail, getPasswordByUserId, createClient,getUserByUserId,checkRelation ,createRelation}  
