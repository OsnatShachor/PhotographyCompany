const express = require('express');
const router = express.Router();
const controller = require("../controllers/ManagerController");

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
router.get("/", async (req, res) => {
    try {
        console.log("Hi there:)")
        const waitingRequests = await controller.getWaitingRequests();
        res.json(waitingRequests);
    } catch (error) {
        res.json({ error: "Failed to fetch Photographers" });
        throw error;
    }
},);
module.exports = router;
