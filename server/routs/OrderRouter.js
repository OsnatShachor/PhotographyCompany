const express = require('express');
const router = express.Router();
const controller = require("../controllers/OrderController");

// מביא את כל ההזמנות של הצלם
router.get("/:userID/:photographerId", async (req, res) => {
    try {
        const userID = req.params.userID;
        const photographerId = req.params.photographerId;
        const orders = await controller.getAllMyOrders(userID, photographerId);
        console.log("Fetched orders: "+ JSON.stringify (orders));
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ error: "Failed to fetch orders" });
    }
});

// מביא את התאריכים הפנויים של הצלם
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

//  update an existing order
router.put("/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedOrder = await controller.updateOrder(orderId, req.body);
        res.status(200).send(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ error: "Failed to update order" });
    }
});

module.exports = router;
