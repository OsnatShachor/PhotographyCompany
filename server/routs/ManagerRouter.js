const express = require('express');
const router = express.Router();
const controller = require("../controllers/ManagerController");
router.get("/", async (req, res) => {
    try {
        console.log("Hi there:)")
        const waitingRequests = await controller.getALLRequests();
        res.status(200).send(waitingRequests);
        // res.json(waitingRequests);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch requests" });
        throw error;
    }
},);

//בקשה מהצלם למנהל
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const returnedRequest = await controller.createRequest(body.photographerID, body.request, body.statusID);
        console.log("Request created successfully:", returnedRequest);
        res.json(returnedRequest);

    } catch (err) {
        console.error('Error during create request:', err);
        res.status(500).send('Internal Server Error');
    }
});
//עדכון סטטוס
router.put("/:orderId", async (req, res) => {
    try {
        const body = req.body;
        const updatedStatus = await controller.updateStatus(body.requestId, body.statusID, body.photographerID);
        res.status(200).send(updatedStatus);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ error: "Failed to update order" });
    }
});
module.exports = router;
