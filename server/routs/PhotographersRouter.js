const express = require('express');
const router = express.Router();
const controller = require("../controllers/PhotographersController");

router.get("/", async (req, res) => {
    try {
        console.log("router get")
        const photographers = await controller.getAllPhotographers();
        res.status(200).send(photographers);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch Photographers" });
        throw error;
    }
},
);


module.exports = router;