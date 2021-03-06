const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Farmer = require('../models/farmer');
const authFarmer = require('../middlewares/auth-farmer');
const router = new express.Router();

router.post('/register', async (req, res) => {
  const farmer = new Farmer(req.body);
  try {
    await farmer.save();
    const token = await farmer.generateAuthToken();
    res.status(201).send({ farmer: farmer, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const farmer = await Farmer.findByCredentials(req.body.username, req.body.password);
    const token = await farmer.generateAuthToken();
    res.send({ farmer, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/logout', authFarmer, async (req, res) => {
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
