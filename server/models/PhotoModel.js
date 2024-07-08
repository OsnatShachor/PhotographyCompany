const pool = require('../DB.js');

async function getPhotos(photographerID) {
    try {
        const sql = 'SELECT * FROM photo_upload WHERE photographerID=?';
        const result = await pool.query(sql,[photographerID]);
        console.log("GET pHOTOS"+JSON.stringify(result[0]));
        return result[0];
    } catch (err) {
        console.error("Error getting photos:", err);
        throw err;
    }
}

async function insertPhoto(data) {
    try {
        const sql = `
            INSERT INTO photo_upload (photographerID, url_photo, date)
            VALUES (?, ?, ?)
        `;
        const values = [
            data.photographerID,
            data.photo,
            data.date
        ];
        const [result] = await pool.query(sql, values);
        const photoID=result.insertId
        console.log("model-photos"+JSON.stringify(photoID));
        return photoID;  // Return the ID of the inserted photo
    } catch (err) {
        console.error("Error inserting photo:", err);
        throw err;
    }
}

// async function insertPhotographersPhoto(photographerID,photoID) {
//     try {

//         const photographerPhotoSql = "INSERT INTO photographer_photos (photographerID, photoID) VALUES (?, ?)";
//       await pool.query(photographerPhotoSql, [photographerID, photoID]);

//     } catch (err) {
//         console.error("Error inserting PhotographersPhoto:", err);
//         throw err;
//     }
// }
async function getPhotoById(photoId) {
    try {
      const sql = 'SELECT * FROM photo_upload WHERE photoID = ?';
      const result = await pool.query(sql, [photoId]);
      return result[0][0];
    } catch (err) {
      console.error("Error getting photo:", err);
      throw err;
    }
  }
  
  async function deletePhoto(photoId) {
    try {
      const sql = "DELETE FROM photo_upload WHERE photoID = ?";
      const result = await pool.query(sql, [photoId]);
      return result;
    } catch (err) {
      console.error("Error deleting photo:", err);
      throw err;
    }
  }
  
  module.exports = { getPhotos, insertPhoto, deletePhoto, getPhotoById };
  