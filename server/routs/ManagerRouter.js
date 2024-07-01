const express = require('express');
const router = express.Router();
const ManagerController = require('../controllers/ManagerController');

router.get('/', ManagerController.getALLRequests);

router.post('/', ManagerController.createRequest);

router.put('/:orderId', ManagerController.updateStatus);

module.exports = router;
