const model = require('../models/PhotoModel');

async function getPhotos() {
    try {
        return model.getGallry(); 
    } catch (err) {
        throw err;
    }
}
module.exports={getPhotos}