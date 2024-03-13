const User = require('../models/User');

class SignupController {
  static async signUp(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      await User.create(firstName, lastName, email, password);

      console.log('User registered successfully');
      res.status(200).json({ message: 'Successfully registered' });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Error registering user' });
    }
  }
}

module.exports = SignupController;
