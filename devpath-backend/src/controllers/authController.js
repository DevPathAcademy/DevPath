const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const register = async (req, res) => {
  const { firstName, lastName, email, phone, dob, password } = req.body;

  try {
    // console.log('[REGISTER INPUT]', req.body);

    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.createUser({
      firstName,
      lastName,
      email,
      phone,
      dob,
      password: hashedPassword,
    });

    return res.status(201).json({ user: newUser[0] });
  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    return res.status(500).json({ error: 'Registration failed', detail: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // ✅ Updated JWT payload to include first/last name
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (err) {
    // console.error('[LOGIN ERROR]', err);
    return res.status(500).json({ error: 'Login failed', detail: err.message });
  }
};

module.exports = { register, login };
