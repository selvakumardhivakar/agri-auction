const express = require('express');
const app = express();
require('./db/mongoose');
const farmerRoutes = require('./routes/farmer-routes');
// Express middlewares
app.use(express.json());
app.use('/farmers', farmerRoutes);

module.exports = app;
