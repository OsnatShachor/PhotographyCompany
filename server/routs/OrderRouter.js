const express = require('express');
const router = express.Router();
const controller = require("../controllers/OrderController");

// GET request to fetch all orders for a specific user and photographer
router.get("/:userId/:photographerId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const photographerId = req.params.photographerId;
        const orders = await controller.getAllMyOrders(userId, photographerId);
        console.log("Fetched orders: "+ JSON.stringify (orders));
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ error: "Failed to fetch orders" });
    }
});

// GET request to fetch unavailable dates for a specific photographer
router.get('/unavailable-dates/:photographerId', async (req, res) => {
    try {
        const photographerId = req.params.photographerId;
        const unavailableDates = await controller.getUnavailableDates(photographerId);
        res.json(unavailableDates);
    } catch (err) {
        console.error('Error fetching unavailable dates:', err);
        res.status(500).send('Internal Server Error');
    }
});

// POST request to create a new order
router.post("/", async (req, res) => {
    try {
        const returnedOrder = await controller.createOrder(req.body);
        console.log("Order created successfully:", returnedOrder);
        res.json(returnedOrder);
    } catch (err) {
        console.error('Error during create request:', err);
        if (err.message === "Photographer is not available on this date") {
            res.status(400).send({ error: err.message });
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

module.exports = router;
