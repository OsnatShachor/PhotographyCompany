const model = require('../models/OrderModel');


async function createOrder(body) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        console.log(body)
        const resultOrderRequest = await model.createOrder(body);
        console.log("create order Controller "+resultOrderRequest);
        return resultOrderRequest;
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

module.exports = { createOrder,getAllMyOrders }