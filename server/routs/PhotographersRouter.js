const express = require('express');
const router = express.Router();
const controller = require("../controllers/PhotographersController");


router.get("/", async (req, res) => {
    try {
        const photographers = await controller.getAllActivePhotographers();
        res.status(200).send(photographers);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch Photographers" });
    }
},);

router.get("/:photographerId",async (req, res) => {
    try {
        const photographerId = req.params.photographerId;
        const information = await controller.getInformation(photographerId);
        res.status(200).send(information);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch price list" });
    }
},);




module.exports = router;