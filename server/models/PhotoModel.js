const pool = require('../DB.js');
async function getPhotos() {
try {
    const sql = 'SELECT * FROM imgUpload';
    const result = await pool.query(sql);
    return result[0];
}
catch (err) {
    throw err;
}
}
module.exports={getPhotos}