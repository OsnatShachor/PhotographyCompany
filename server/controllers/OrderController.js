const model = require('../models/OrderModel');

async function createOrder(body) {
    try {
        const availabilityResult = await model.checkPhotographerAvailability(body.photographerID, body.photoDate);

        if (availabilityResult.length > 0) {
            throw new Error("Photographer is not available on this date");
        }

        const resultOrderRequest = await model.createOrder(body);
        console.log("Created order:", resultOrderRequest);
        return resultOrderRequest;
    } catch (err) {
        throw err;
    }
}

async function getUnavailableDates(photographerID) {
    try {
        console.log("Controller: Getting unavailable dates for photographer:", photographerID);
        const unavailableDates = await model.getUnavailableDates(photographerID);
        console.log("Controller: Unavailable dates:", unavailableDates);
        return unavailableDates;
    } catch (err) {
        console.error("Controller: Error getting unavailable dates:", err);
        throw err;
    }
}

async function getAllMyOrders(userID, photographerId) {
    try {
        const orders = await model.getAllMyOrders(userID, photographerId);
        console.log("Fetched orders:", JSON.stringify(orders));
        return orders;
    } catch (err) {
        throw err;
    }
}

async function updateOrder(orderId, updatedOrderData) {
    try {
        const updatedOrder = await model.updateOrder(orderId, updatedOrderData);
        return updatedOrder;
    } catch (err) {
        throw err;
    }
}

module.exports = { createOrder, getAllMyOrders, getUnavailableDates, updateOrder };
