const express = require('express');
const router = express.Router();
const controller = require("../controllers/ManagerController");
 const authrizeManager = require('../middleware/authrizeManager')
router.get("/", authrizeManager,async (req, res) => {
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

//עדכון סטטוס
router.put("/:orderId",authrizeManager, async (req, res) => {
    try {
        console.log("I am in aprovel req")
        const body = req.body;
        const updatedStatus = await controller.updateStatus(body.requestID, body.statusID, body.photographerID);
        res.status(200).send(updatedStatus);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ error: "Failed to update order" });
    }
});
module.exports = router;
