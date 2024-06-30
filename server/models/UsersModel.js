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
async function checkRelation(userID, photographerId) {
  try {
    const sql = 'SELECT * FROM relations WHERE clientID = ? AND photographerID= ?';
    const [rows] = await pool.query(sql, [userID, photographerId]);
    return rows;
  } catch (err) {
    throw err;
  }
}
async function createRelation(userID, photographerId) {
  try {
    const sqlRelations = `INSERT INTO relations (photographerID,clientID) values(?,?)`;
    const [relation] = await pool.query(sqlRelations, [photographerId, userID]);
    return relation;
  } catch (err) {
    throw err;
  }
}
async function getPasswordByUserID(userID) {
  try {
    const sql = 'SELECT password FROM passwords WHERE userID = ?';
    const [rows] = await pool.query(sql, [userID]);
    return rows;
  } catch (err) {
    throw err;
  }
}
async function getUserByUserID(userID) {
  try {
    const sql = 'SELECT * FROM users WHERE userID = ?';
    const [rows] = await pool.query(sql, [userID]);
    return rows;
  } catch (err) {
    throw err;
  }
}
async function createUser(userName, email, phone, roleID, cryptedPassword) {
  try {
    const sql = `INSERT INTO users (userName,email,phone,roleID) values(?,?,?,?)`;
    const [resultUser] = await pool.query(sql, [userName, email, phone, roleID]);
    const userID = resultUser.insertId;
    console.log("userModel userID " + userID)
    const sqlPassword = `INSERT INTO passwords (userID, password) values(?, ?)`;
    await pool.query(sqlPassword, [userID, cryptedPassword]);
    const sqlPhotographer = `INSERT INTO photographers (photographerID, isActive) values(?, ?)`;
    await pool.query(sqlPhotographer, [userID, false]);
    return { userID, userName, email, phone, roleID };
  }
  catch (err) {
    throw (err);
  }
}


async function createClient(photographerId, userName, email, phone, roleID, cryptedPassword) {
  try {
    console.log(photographerId);
    const sql = `INSERT INTO users (userName, email, phone, roleID) values (?, ?, ?, ?)`;
    const [resultUser] = await pool.query(sql, [userName, email, phone, roleID]);
    const userID = resultUser.insertId;
    console.log("userModel userID " + userID);
    const sqlPassword = `INSERT INTO passwords (userID, password) values (?, ?)`;
    await pool.query(sqlPassword, [userID, cryptedPassword]);

    const relations = await checkRelation(userID, photographerId);
    if (relations.length === 0) {
      await createRelation(userID, photographerId);
    }
    return { userID, userName, email, phone, roleID };
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, getUserByEmail, getPasswordByUserID, createClient, getUserByUserID, checkRelation, createRelation }  
