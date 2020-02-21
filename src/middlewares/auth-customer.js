const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const authCustomer = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismypwd');
    const user = await Customer.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate!' });
  }
};
module.exports = authCustomer;
