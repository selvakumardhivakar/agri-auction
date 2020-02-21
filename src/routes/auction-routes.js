const express = require('express');
const Auction = require('../models/auction');

const router = express.Router();

router.post('/newAuction', async (req, res) => {
  const auction = new Auction(req.body);
  try {
    await auction.save();
    res.status(201).send({ auction });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/auctions', async (req, res) => {
  try {
    const auctions = Auction.find({});
    res.send(auctions);
  } catch (e) {
    res.status(400).send(e);
  }
});
