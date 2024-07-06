const model = require('../models/PhotographerManagementModel');

async function updateAbout(req, res) {
    const photographerID = req.body.id;
    const aboutMe = req.body.aboutMe;
    try {
        await model.updateAbout(photographerID, aboutMe);
        res.status(200).json({ message: 'About me updated successfully' });
    } catch (error) {
        throw error;
    }
}

async function checkIfPhotographerActive(req, res) {
    const photographerID = req.params.id;
    try {
        const isActive = await model.checkIfPhotographerActive(photographerID);
        res.status(200).json(isActive);
    } catch (error) {
        throw error;
    }
}
const getPhotographerOrders = async (photographerID) => {
    try {
        const orders = await model.getPhotographerOrders(photographerID);
        return orders;
    } catch (error) {
        throw error;
    }
};

async function updateOrder(orderId, updatedStatusOrder) {
    try {
        const updatedOrder = await model.updateOrder(orderId, updatedStatusOrder);
        return updatedOrder;
    } catch (err) {
        throw err;
    }
}

module.exports = { updateAbout, checkIfPhotographerActive,updateOrder,getPhotographerOrders };
