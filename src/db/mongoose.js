const mongoose = require('mongoose');
// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/auction', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Connected successfully!'));

module.exports = mongoose;
