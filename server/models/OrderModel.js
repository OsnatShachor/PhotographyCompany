const pool = require('../DB.js');

async function getAllMyOrders(userId,photographerId) {
    try {
      const sql = `
      SELECT *
      FROM orders
      WHERE userID = ? AND photographerID = ?
    `;
      const [rows] = await pool.query(sql,[userId,photographerId]);
      console.log("model get all myorders "+JSON.stringify(rows))
      return rows;
    } catch (err) {
      return (err);
    }
  }
async function createOrder(body) {
    try {
        const sql = `INSERT INTO orders (userID,photographerID, confirmed,statusID,categoryID,photoDate,beginningTime,durationTimePhotography,location,payment) values(?,?,?,?,?,?,?,?,?,?)`;
        const [resultOrderRequest] = await pool.query(sql, [body.userID, body.photographerID, body.confirmed, body.statusID, body.categoryID, body.photoDate, body.beginningTime, body.durationTimePhotography, body.location, body.payment]);
        const orderID = resultOrderRequest.insertId;
        console.log("order Model orderID " + orderID)
        return orderID;
    }
    catch (err) {
        throw (err);
    }
}

module.exports = { createOrder,getAllMyOrders }  
