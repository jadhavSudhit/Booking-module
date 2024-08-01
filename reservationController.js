// controllers/reservationController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const reservationsFilePath = path.join(__dirname, '../data/reservations.json');

const readReservationsFromFile = () => {
  return JSON.parse(fs.readFileSync(reservationsFilePath, 'utf8'));
};

const writeReservationsToFile = (reservations) => {
  fs.writeFileSync(reservationsFilePath, JSON.stringify(reservations, null, 2));
};

exports.getReservations = (req, res) => {
  const reservations = readReservationsFromFile();
  res.json(reservations);
};

exports.createReservation = (req, res) => {
  const newReservation = { ...req.body, reservationId: uuidv4() };
  const reservations = readReservationsFromFile();
  reservations.push(newReservation);
  writeReservationsToFile(reservations);
  res.status(201).json(newReservation);
};

exports.updateReservation = (req, res) => {
  const { reservationId } = req.params;
  const reservations = readReservationsFromFile();
  const index = reservations.findIndex((reservation) => reservation.reservationId === reservationId);
  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...req.body };
    writeReservationsToFile(reservations);
    res.json(reservations[index]);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
};

exports.deleteReservation = (req, res) => {
  const { reservationId } = req.params;
  const reservations = readReservationsFromFile();
  const index = reservations.findIndex((reservation) => reservation.reservationId === reservationId);
  if (index !== -1) {
    reservations.splice(index, 1);
    writeReservationsToFile(reservations);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
};
