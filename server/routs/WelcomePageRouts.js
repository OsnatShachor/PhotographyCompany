const express = require('express');
const router = express.Router();
const controller = require("../controllers/WelcomePageController");

router.get("/welcomePage", async (req, res) => {
    try {
        const photographers = await controller.getAllPhotographers();
        res.status(200).send(photographers);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch Photographers" });
        return error;
    }
},);
