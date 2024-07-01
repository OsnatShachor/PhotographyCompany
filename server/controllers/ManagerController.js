const model = require('../models/ManagerModel');

const getALLRequests = async (req, res) => {
    try {
        console.log("Hi there:)");
        const waitingRequests = await model.getALLRequests();
        res.status(200).send(waitingRequests);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch requests' });
        throw error;
    }
};

const createRequest = async (req, res) => {
    try {
        const { photographerID, request, statusID } = req.body;
        const returnedRequest = await model.createRequest(photographerID, request, statusID);
        console.log("Request created successfully:", returnedRequest);
        res.json(returnedRequest);
    } catch (err) {
        console.error('Error during create request:', err);
        res.status(500).send('Internal Server Error');
    }
};

const updateStatus = async (req, res) => {
    try {
        console.log("I am in approval req");
        const { requestID, statusID, photographerID } = req.body;
        const updatedStatus = await model.updateStatus(requestID, statusID);
        console.log("controller-manager");

        if (updatedStatus && statusID == 4) {
            try {
                await model.updateActivePhotographer(photographerID);
            } catch (err) {
                throw err;
            }
        }
        res.status(200).send(updatedStatus);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ error: 'Failed to update order' });
    }
};

module.exports = { getALLRequests, createRequest, updateStatus };
