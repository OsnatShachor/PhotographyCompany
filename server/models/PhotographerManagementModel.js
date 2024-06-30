const pool = require('../DB'); 

async function updateAbout(photographerID, aboutMe) {
  const query = 'UPDATE photographers SET aboutMe = ? WHERE photographerID = ?';
  try {
    await pool.query(query, [aboutMe, photographerID]);
  } catch (error) {
    throw new Error('Failed to update about me');
  }
};
module.exports={updateAbout}