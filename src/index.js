const app = require('./app');
// Setting up the port
const port = process.env.PORT || 8000;
// Listening to the server
app.listen(port, () => console.log(`Server is running on ${port}`));
