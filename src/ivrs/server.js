const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    language: 'ta-IN',
  });
  gather.say({ voice: 'alice', action: '/auction' }, 'Press 1 to create auction!');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});
app.post('/auction', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    language: 'ta-IN',
  });
  gather.say({ voice: 'alice', action: '/quantity' }, 'Press 1 to select tomato!');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

app.post('/quantity', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    language: 'ta-IN',
  });
  gather.say({ voice: 'alice', action: '/quantity' }, 'Enter the number of products:');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(1337, () => {
  console.log('Now listening on port 1337. ' + 'Be sure to restart when you make code changes!');
});
