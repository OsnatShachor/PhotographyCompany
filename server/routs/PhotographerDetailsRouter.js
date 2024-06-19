const express = require('express');
const router = express.Router();
const controller = require("../controllers/PhotographersController");
router.get("/:id",async (req, res) => {
    try {
        const id = req.params.id;
        console.log("router get")
        const category = await controller.getCategory(id);
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch price list" });
        throw error;
    }
},);
module.exports = router;