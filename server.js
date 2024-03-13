// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const knex = require('knex'); // Import the 'knex' module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap')));

// Serve your HTML file directly using Express's sendFile method
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Connect to PostgreSQL database using Knex.js
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'tousif123',
    database: 'NewDB'
  }
});

// Define a route to handle sign-in requests
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists
  db.select('*').from('users').where('email', '=', email).andWhere('password', '=', password)
    .then(user => {
      if (user.length) {
        res.json('Sign-in successful'); // Send a success message
      } else {
        res.status(400).json('Invalid email or password'); // Send an error message
      }
    })
    .catch(err => res.status(500).json('Error signing in')); // Handle any errors
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
