// routes/stayRoutes.js
const express = require('express');
const stayController = require('../controllers/stayController');

const router = express.Router();

router.get('/', stayController.getStays);
router.post('/', stayController.createStay);
router.put('/:roomId', stayController.updateStay);
router.delete('/:roomId', stayController.deleteStay);

module.exports = router;
