const express = require('express');
const router = express.Router();
const controller = require("../controllers/OrderController");
// const authorizePhotographer = require('../middleware/authorizePhotographer');
const authorizeClient = require('../middleware/authorizeClient');

router.get('/unavailableDates/:photographerId', async (req, res) => {
    try {
        const { photographerId } = req.params;
        console.log("Router: Fetching unavailable dates for photographer:", photographerId);
        const unavailableDates = await controller.getUnavailableDates(photographerId);
        console.log("Router: Unavailable dates: ", unavailableDates);
        res.status(200).json(unavailableDates);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

router.get("/:userID/:photographerId",authorizeClient, async (req, res) => {
    try {
        const  userID = req.params.userID;
        const photographerId= req.params.photographerId;
        const orders = await controller.getAllMyOrders(userID, photographerId);
        console.log("photographerId "+photographerId);
        console.log("userID "+userID);
        console.log("Fetched orders Router: ", orders);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

router.post("/",authorizeClient, async (req, res) => {
    try {
        const returnedOrder = await controller.createOrder(req.body);
        console.log("Order created successfully:", returnedOrder);
        res.status(201).json(returnedOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        if (err.message === "Photographer is not available on this date") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

router.put("/:orderId",authorizeClient, async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await controller.updateOrder(orderId, req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
});

module.exports = router;
