const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const knex = require('knex');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files
app.use('/css', express.static(path.join(__dirname,'..', 'css')));
app.use('/images', express.static(path.join(__dirname,'..', 'images')));
app.use('/bootstrap', express.static(path.join(__dirname,'..','bootstrap')));

// Serve your HTML file directly using Express's sendFile method
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));
});

// Serve the sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname,'..','views', 'signup.html'));
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
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to check if the user exists
    const user = await db.select('*').from('users').where('email', '=', email).first();
    if (user) {
      // Compare hashed password with the provided password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ message: 'Sign-in successful' });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error signing in:', err);
    res.status(500).json({ message: 'Error signing in' });
  }
});

// Define a route to handle sign-up requests
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if any required field is missing
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email is already registered
    const existingUser = await db('users').where('email', email).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the new user into the database with the hashed password
    await db('users').insert({ firstName, lastName, email, password: hashedPassword });

    console.log('User registered successfully');
    res.status(200).json({ message: 'Successfully registered' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
