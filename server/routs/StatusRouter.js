const express = require('express');
const router = express.Router();
const controller = require("../controllers/StatusController");

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const status = await controller.getStatus(id);
        res.status(200).send(status);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch stauses" });
    }
},);

module.exports = router;