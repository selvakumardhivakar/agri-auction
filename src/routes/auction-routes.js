const express = require('express');
const Auction = require('../models/auction');

const router = express.Router();

router.post('/createauction', async (req, res) => {
  const auction = new Auction(req.body);
  console.log(auction);
  try {
    await auction.save();
    res.status(201).send({ auction });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find({});
    res.send(auctions);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
