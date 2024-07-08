const model = require('../models/ManagerModel');


async function createRequest(photographerID, request,statusID) {
    try {
        const requestResult = await model.createRequest(photographerID, request,statusID);
        console.log("create request Controller "+requestResult);
        return requestResult;
    } catch (err) {
        throw err;
    }
}

async function getALLRequests() {
    try {
        const requestResult = await model.getALLRequests();
        console.log("getALLRequests" +requestResult);
        return requestResult;
    } catch (err) {
        throw err;
    }
}
async function updateStatus(requestID, statusID, photographerID) {
  
       try {
        const result = await model.updateStatus(requestID, statusID);
        console.log("controller-maneger")
        if (result&& statusID==4){
            try{
                await model.updateActivePhotographer(photographerID);
            }catch (err) {
                throw err;
            }
        }
        return result;
    } catch (err) {
        throw err;
    }
  
}

module.exports = { createRequest ,getALLRequests,updateStatus}