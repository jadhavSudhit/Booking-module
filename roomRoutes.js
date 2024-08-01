// routes/roomRoutes.js
const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.get('/', roomController.getRooms);
router.post('/', roomController.createRoom);
router.put('/:roomId', roomController.updateRoom);
router.delete('/:roomId', roomController.deleteRoom);

module.exports = router;
