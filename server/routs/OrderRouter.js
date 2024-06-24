const express = require('express');
const router = express.Router();
const controller = require("../controllers/OrderController");
router.get("/", async (req, res) => {
    try {
        const {userId,photographerId}=req.body
        const orders = await controller.getAllMyOrders(userId,photographerId);
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch orders" });
        throw error;
    }
},);
router.post("/", async (req, res) => {
    try {

        const returnedOrder = await controller.createOrder(req.body);
        console.log("Order created successfully:", returnedOrder);
        res.json(returnedOrder);

    } catch (err) {
        console.error('Error during create request:', err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;