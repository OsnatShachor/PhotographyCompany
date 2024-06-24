const model = require('../models/ManagerModel');


async function createRequest(photographerID, request,statusID) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const requestResult = await model.createRequest(photographerID, request,statusID);
        console.log("create request Controller "+requestResult);
        return requestResult;
    } catch (err) {
        throw err;
    }
}

async function getWaitingRequests() {
    try {
        const requestResult = await model.getWaitingRequests();
        console.log("getWaitingRequests" +requestResult);
        return requestResult;
    } catch (err) {
        throw err;
    }
}

module.exports = { createRequest ,getWaitingRequests}