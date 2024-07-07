const model = require('../models/PhotoModel');

async function getPhotos(photographerID) {
  try {
    return await model.getPhotos(photographerID);
  } catch (err) {
    throw err;
  }
}

async function createPhoto(data) {
  try {

    const photoID = await model.insertPhoto(data);
    // if (photoID!=0)
    //   return  await model.insertPhotographersPhoto(data.photographerID,photoID)
    return { photoID, photographerID: data.photographerID, url_photo: data.photo, date: data.date }
  } catch (err) {
    throw err;
  }
}

async function deletePhoto(photoId) {
  try {
    return await model.deletePhoto(photoId);
  } catch (err) {
    throw err;
  }
}

module.exports = { getPhotos, createPhoto, deletePhoto };
