const model = require('../models/OrderModel');


async function createOrder(body) {
    try {
        // בדיקה אם הצלם זמין בתאריך המבוקש
        const availabilityResult = await model.checkPhotographerAvailability(body.photographerID, body.photoDate);

        if (availabilityResult.length > 0) {
            throw new Error("Photographer is not available on this date");
        }
        // אם הצלם זמין, ניצור את ההזמנה
        const resultOrderRequest = await model.createOrder(body);
        console.log("create order Controller:", resultOrderRequest);
        return resultOrderRequest;
    } catch (err) {
        throw err;
    }
}

async function getUnavailableDates(photographerID) {
    try {
        const unavailableDates = await model.getUnavailableDates(photographerID);
        return unavailableDates;
    } catch (err) {
        throw err;
    }
}

async function getAllMyOrders(userId,photographerId) {
    try {
        const resultOrderRequest = await model.getAllMyOrders(userId,photographerId);
        console.log("getAllMY order Controller "+resultOrderRequest);
        return resultOrderRequest;
    } catch (err) {
        throw err;
    }
}

module.exports = { createOrder,getAllMyOrders ,getUnavailableDates}