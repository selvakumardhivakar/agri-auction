const express = require('express');
const Retail = require('../models/retail');

const router = express.Router();

router.post('/createretail', async (req, res) => {
  const retail = new Retail(req.body);
  console.log(retail);
  try {
    await retail.save();
    res.status(201).send({ retail });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/retails', async (req, res) => {
  try {
    const retails = await Retail.find({});
    res.send(retails);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
