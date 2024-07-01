const express = require('express');
const router = express.Router();
const PhotographersController = require('../controllers/PhotographersController');

router.get('/', PhotographersController.getAllActivePhotographers);

router.get('/:photographerId', PhotographersController.getInformation);

module.exports = router;
