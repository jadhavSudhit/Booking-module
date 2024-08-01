// routes/reservationRoutes.js
const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/', reservationController.getReservations);
router.post('/', reservationController.createReservation);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;
