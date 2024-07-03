const pool = require('../DB.js');

async function getPhotos() {
    try {
        const sql = 'SELECT * FROM photo_upload';
        const result = await pool.query(sql);
        return result[0];
    } catch (err) {
        console.error("Error getting photos:", err);
        throw err;
    }
}

async function insertPhoto(data) {
    try {
        const sql = "INSERT INTO `photo_upload` SET ?";
        const [result] = await pool.query(sql, data);
        return result.insertId;  // החזרת ה-ID של התמונה שנוספה
    } catch (err) {
        console.error("Error inserting photo:", err);
        throw err;
    }
}
async function insertPhotographersPhoto(data,photoID) {
    try {

        const photographerPhotoSql = "INSERT INTO photographer_photos (photographerID, photoID) VALUES (?, ?)";
      await pool.query(photographerPhotoSql, [data.photographerID, photoID]);

    } catch (err) {
        console.error("Error inserting PhotographersPhoto:", err);
        throw err;
    }
}
async function deletePhoto(photoId) {
    try {
        const sql = "DELETE FROM `photo_upload` WHERE photoID = ?";
        const result = await pool.query(sql, [photoId]);
        return result;
    } catch (err) {
        console.error("Error deleting photo:", err);
        throw err;
    }
}

module.exports = { getPhotos, insertPhoto, deletePhoto, insertPhotographersPhoto };
