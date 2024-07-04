const express = require('express');
const router = express.Router();
const PhotographerManagementController = require('../controllers/PhotographerManagementController');

router.post('/:id/update-about', PhotographerManagementController.updateAbout); 

router.get('/:id', PhotographerManagementController.checkIfPhotographerActive);

module.exports = router;
