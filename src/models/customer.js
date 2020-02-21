const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes('password' || '12345678')) {
          throw new Error("Your password can't be a predictive!");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  },
);

customerSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

customerSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismypwd');

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

customerSchema.statics.findByCredentials = async (username, password) => {
  const customer = await Customer.findOne({ username });
  if (!customer) {
    throw new Error('Check the credentials!');
  }
  const isValid = await bcrypt.compare(password, customer.password);
  if (!isValid) {
    throw new Error('Check the credentials');
  }
  console.log(customer);

  return customer;
};

customerSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
