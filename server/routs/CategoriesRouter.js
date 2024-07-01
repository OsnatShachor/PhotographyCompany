const express = require('express');
const router = express.Router();
const controller = require("../controllers/CategoryController");
router.get("/:id",async (req, res) => {
    try {
        const id = req.params.id;
        console.log("router get")
        const category = await controller.getAllCategories(id);
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch price list" });
        throw error;
    }
},);

router.get("/:photographerId/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;
        const orderCategory = await controller.getOrderCategory(categoryID);
        res.status(200).send(orderCategory);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ error: "Failed to fetch orders" });
    }
});
router.put('/:id', controller.updateCategory);

router.post('/', controller.addCategory);

router.delete('/:id', controller.deleteCategory);

module.exports = router;