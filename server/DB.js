 const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'photogaphDB',
  port: 3306,
  password: 'צטד/ך24',
}).promise();

module.exports = pool;