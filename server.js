// server.js
const express = require('express');
const bodyParser = require('body-parser');

const roomRoutes = require('./routes/roomRoutes');
const stayRoutes = require('./routes/stayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const customerRoutes = require('./routes/customerRoutes');

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
