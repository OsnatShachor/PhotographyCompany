const express = require('express');
const router = express.Router();
const controller = require("../controllers/ManagerController");
// const authorizeManager = require('../middleware/authorizeManager');

router.get("/", async (req, res) => {
    try {
        const waitingRequests = await controller.getALLRequests();
        res.status(200).send(waitingRequests);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch requests" });
    }
});

router.put("/:orderId", async (req, res) => {
    try {
        const { requestID, statusID, photographerID } = req.body;
        const updatedStatus = await controller.updateStatus(requestID, statusID, photographerID);
        res.status(200).send(updatedStatus);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ error: "Failed to update order" });
    }
});

module.exports = router;
