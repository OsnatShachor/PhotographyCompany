const model = require('../models/StatusModel');


async function getStatus(statusID) {
    try {
        const status =await model.getStatus(statusID)
        return status;
    } catch (err) {
        throw err;
    }
}

module.exports = { getStatus }