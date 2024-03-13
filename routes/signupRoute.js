const express = require('express');
const router = express.Router();
const path = require('path');
const SignupController = require('../controllers/signupController');

// Route for serving the sign-up page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
});

// Route for handling sign-up requests
router.post('/signup', SignupController.signUp);

module.exports = router;
