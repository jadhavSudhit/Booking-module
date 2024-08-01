// server.js
const express = require('express');
const bodyParser = require('body-parser');

const roomRoutes = require('./roomRoutes');
const stayRoutes = require('./stayRoutes');
const reservationRoutes = require('./reservationRoutes');
const customerRoutes = require('./customerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/stays', stayRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
