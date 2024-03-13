const User = require('../models/User');
const bcrypt = require('bcrypt');

class IndexController {
  static async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      if (user) {
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
  }
}

module.exports = IndexController;
