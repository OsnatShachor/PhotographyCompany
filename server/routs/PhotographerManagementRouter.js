const express = require('express');
const router = express.Router();
const controller = require('../controllers/PhotographerManagementController');
const authorizePhotographer = require('../middleware/authorizePhotographer');

router.post('/:id/update-about', authorizePhotographer, async (req, res) => {
    try {
        await controller.updateAbout(req, res);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update about me' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        await controller.checkIfPhotographerActive(req, res);
    } catch (error) {
        res.status(500).send({ error: 'Failed to check' });
    }
});

router.get('/:photographerID/orders', authorizePhotographer, async (req, res) => {
    try {
        const { photographerID } = req.params;
        const orders = await controller.getPhotographerOrders(photographerID);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Update an existing order
router.put("/:orderId",authorizePhotographer, async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await controller.updateOrder(orderId, req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: "Failed to update order" });
    }
});
module.exports = router;
