const PhotographerManagementModel = require('../models/PhotographerManagementModel');

async function updateAbout(req, res) {
    const photographerID = req.body.id;
    const aboutMe = req.body.aboutMe;
    try {
        await PhotographerManagementModel.updateAbout(photographerID, aboutMe);
        res.status(200).json({ message: 'About me updated successfully' });
    } catch (error) {
        throw error;
    }
}

async function checkIfPhotographerActive(req, res) {
    const photographerID = req.params.id;
    try {
        const isActive = await PhotographerManagementModel.checkIfPhotographerActive(photographerID);
        res.status(200).json(isActive);
    } catch (error) {
        throw error;
    }
}

module.exports = { updateAbout, checkIfPhotographerActive };
