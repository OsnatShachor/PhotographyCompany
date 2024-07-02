const model = require('../models/PhotographersModel');

async function getAllActivePhotographers() {
    try {
        return await model.getAllActivePhotographers()
    } catch (err) {
        throw err;
    }
}

async function getInformation(photographerId) {
    try {
        return await model.getInformation(photographerId)
    } catch (err) {
        throw err;
    }
}



module.exports = { getAllActivePhotographers, getInformation }