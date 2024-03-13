const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexRoute = require('./routes/indexRoute');
const signupRoute = require('./routes/signupRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoute);
app.use('/', signupRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
