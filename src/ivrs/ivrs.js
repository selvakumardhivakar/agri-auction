const accountSid = 'AC5a11ec766c004f5e6d182f4b0ea4fa4c';
const authToken = '75c355c0e8b67ee0f22e98056209955f';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://127.0.0.1:1337',
    to: '+918940199388',
    from: '+12036978387',
  })
  .then((call) => console.log(call.sid));
