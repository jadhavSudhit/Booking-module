// models/reservation.js
const Reservation = {
  reservationId: 0,
  locationId: 0,
  roomId: 0,
  customerId: 0,
  arrivalDate: 'YYYY-MM-DD',
  departureDate: 'YYYY-MM-DD',
  reservationDate: 'YYYY-MM-DD HH:MM:SS',
  totalPrice: 0,
  status: 'CONFIRM',
  paidAmount: 0,
  numberOfGuest: 0,
};

module.exports = Reservation;
