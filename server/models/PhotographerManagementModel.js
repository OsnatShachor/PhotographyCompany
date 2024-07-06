const pool = require('../DB'); 

async function updateAbout(photographerID, aboutMe) {
  const query = 'UPDATE photographers SET aboutMe = ? WHERE photographerID = ?';
  try {
    await pool.query(query, [aboutMe, photographerID]);
  } catch (error) {
    throw new Error('Failed to update about me');
  }
};

async function checkIfPhotographerActive(photographerID) {
  const query = 'SELECT isActive FROM photographers WHERE photographerID = ?';
  try {
    const [rows] = await pool.query(query, [photographerID]); // שינוי להחזרת שורות
    if (rows.length === 0) {
      throw new Error('Photographer not found'); 
    }
    return rows[0]; // החזרת השורה הראשונה
  } catch (error) {
    throw new Error('Failed to check photographer');
  }
}

async function updateOrder(orderId, updatedStatusOrder) {
  try {
      const sql = `
      UPDATE orders
      SET statusID = ?
      WHERE orderID = ?`;
      const  statusID  = updatedStatusOrder;
      const [result] = await pool.query(sql, [statusID]);
      return result;
  } catch (err) {
      throw err;
  }
}

async function getPhotographerOrders (photographerID)  {
  try {
      const sql = `
          SELECT * FROM orders 
          WHERE photographerID = ?;
      `;
      const [orders] = await pool.query(sql, [photographerID]);
      return orders;
  } catch (error) {
      throw error;
  }
}

module.exports={updateAbout, checkIfPhotographerActive,updateOrder,getPhotographerOrders}