const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Customer = require('../models/customer');
const authCustomer = require('../middlewares/auth-customer');
const router = new express.Router();

router.post('/register', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    const token = await customer.generateAuthToken();
    res.status(201).send({ customer, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const customer = await Customer.findByCredentials(req.body.username, req.body.password);
    const token = await customer.generateAuthToken();
    res.send({ customer, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/logout', authCustomer, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    console.log(req.user.tokens);

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
