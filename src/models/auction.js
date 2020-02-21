const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auctionScheme = new mongoose.Schema({
  auctionname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  baseprice: {
    type: Number,
  },
});

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
