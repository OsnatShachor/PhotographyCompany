const express = require('express');
const router = express.Router();
const controller = require("../controllers/CategoryController");
const authorizePhotographer = require('../middleware/authorizePhotographer');

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
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
        console.error('Error fetching categories:', error);
        res.status(500).send({ error: "Failed to fetch categories" });
    }
});

router.put('/:id', authorizePhotographer, async (req, res) => {
    try {
        const body = req.body;
        const updateCategory = await controller.updateCategory(body);
        if (updateCategory) {
            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});



router.post('/', authorizePhotographer, async (req, res) => {
    try {
        const newCategory = await controller.addCategory(req.body);
        if (newCategory) {
            res.status(200).json(newCategory);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add category' });
    }
});

router.delete('/:id', authorizePhotographer, async (req, res) => {
    try {
        const categoryId = req.params.id;
        console.log("delete Category controller");
        await controller.deleteCategory(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});
module.exports = router;