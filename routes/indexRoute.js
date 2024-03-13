const express = require('express');
const router = express.Router();
const path = require('path');
const IndexController = require('../controllers/indexController');

// Route for serving the index page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Route for handling sign-in requests
router.post('/signin', IndexController.signIn);

module.exports = router;
