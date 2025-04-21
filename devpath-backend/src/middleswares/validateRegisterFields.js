const moment = require('moment');

const validateRegisterFields = (req, res, next) => {
  const { email, password, dob, phone } = req.body;

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Password strength: 8+ characters, 1 uppercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{};:,<.>]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character',
    });
  }

  // DOB format: MM-DD-YYYY and must be 16+
  const dobRegex = /^(0[1-9]|1[0-2])\-([0-2][0-9]|3[01])\-\d{4}$/;
  if (!dobRegex.test(dob)) {
    return res.status(400).json({ message: 'Date of birth must be in MM-DD-YYYY format using dashes' });
  }

  const parsedDob = moment(dob, 'MM-DD-YYYY');
  const age = moment().diff(parsedDob, 'years');
  if (!parsedDob.isValid() || age < 16) {
    return res.status(400).json({ message: 'You must be at least 16 years old to register' });
  }

// Phone: must contain exactly 10 digits, allow common formats
const phoneDigitsOnly = phone?.replace(/\D/g, ''); // remove all non-digit characters

if (phone && (!/^\d{10}$/.test(phoneDigitsOnly))) {
  return res.status(400).json({
    message: 'Phone number must contain exactly 10 digits (e.g., 1234567890, (123) 456-7890, or 123-456-7890)',
  });
}


  next();
};

module.exports = validateRegisterFields;
