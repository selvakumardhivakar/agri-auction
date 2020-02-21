const mongoose = require('mongoose');
// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/auction', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB successfully connected!'))
  .catch((err) => console.log(err));

module.exports = mongoose;
