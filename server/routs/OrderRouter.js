const express = require('express');
const router = express.Router();
const controller = require("../controllers/OrderController");
router.get("/:userId/:photographerId", async (req, res) => {
    try {
        const userId=req.params.userId;
        const photographerId=req.params.photographerId;
        const orders = await controller.getAllMyOrders(userId,photographerId);
        console.log(orders)
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