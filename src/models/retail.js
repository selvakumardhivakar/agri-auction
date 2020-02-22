const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const retailSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  baseprice: {
    type: Number,
    required: true,
  },
});

const Retail = mongoose.model('Retail', retailSchema);
module.exports = Retail;
