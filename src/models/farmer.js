const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const farmerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    farmerid: {
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
        if (value.toLowerCase().includes('password')) {
          throw new Error("Your password can't be a password!");
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

farmerSchema.methods.toJSON = function() {
  const farmer = this;
  const farmerObject = farmer.toObject();
  delete farmerObject.password;
  delete farmerObject.tokens;
  delete farmerObject.avatar;
  return farmerObject;
};

farmerSchema.methods.generateAuthToken = async function() {
  const farmer = this;
  const token = jwt.sign({ _id: farmer._id.toString() }, 'thisismypwd');

  farmer.tokens = farmer.tokens.concat({ token });
  await farmer.save();
  return token;
};

farmerSchema.statics.findByCredentials = async (username, password) => {
  const farmer = await Farmer.findOne({ username });
  if (!farmer) {
    throw new Error('Check the credentials!');
  }
  const isValid = await bcrypt.compare(password, farmer.password);
  if (!isValid) {
    throw new Error('Check the credentials');
  }
  console.log(farmer);

  return farmer;
};

farmerSchema.pre('save', async function(next) {
  const farmer = this;
  if (farmer.isModified('password')) {
    farmer.password = await bcrypt.hash(farmer.password, 8);
  }
  next();
});

farmerSchema.pre('remove', async function(next) {
  const farmer = this;
  await Task.deleteMany({ owner: farmer._id });
  next();
});

const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;
