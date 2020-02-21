const express = require('express');
const app = express();
const cors = require('cors');
require('./db/mongoose');
const farmerRoutes = require('./routes/farmer-routes');
const customerRoutes = require('./routes/customer-routes');
// Express middlewares
app.use(express.json());
app.use(cors());
app.use('/farmers', farmerRoutes);
app.use('/customers', customerRoutes);

module.exports = app;
