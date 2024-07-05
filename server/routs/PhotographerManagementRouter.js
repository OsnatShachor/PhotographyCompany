const express = require('express');
const router = express.Router();
const controller = require('../controllers/PhotographerManagementController');
 const authorizePhotographer = require('../middleware/authorizePhotographer');

router.post('/:id/update-about',authorizePhotographer, async (req, res) => {
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

module.exports = router;
