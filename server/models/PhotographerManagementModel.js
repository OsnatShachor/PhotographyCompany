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
module.exports={updateAbout, checkIfPhotographerActive}