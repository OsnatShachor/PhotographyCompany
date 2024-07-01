const model = require('../models/PhotographersModel');

const getAllActivePhotographers = async (req, res) => {
    try {
        const photographers = await model.getAllActivePhotographers();
        res.status(200).send(photographers);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch photographers' });
        throw error;
    }
};

const getInformation = async (req, res) => {
    try {
        const photographerId = req.params.photographerId;
        const information = await model.getInformation(photographerId);
        res.status(200).send(information);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch price list' });
        throw error;
    }
};

module.exports = { getAllActivePhotographers, getInformation };
