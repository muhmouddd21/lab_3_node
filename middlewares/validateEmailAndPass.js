const { body, validationResult } = require('express-validator');
const User = require('../models/user');


const validateInputs = (validators) => async (req, res, next) => {
  await Promise.all(validators.map((validator) => validator.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const emailValidator = body('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage('Please provide a valid email');

const passwordValidator = body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  .matches(/\d/).withMessage('Password must contain a number')
  .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character');


const validateEmail = validateInputs([emailValidator]);
const validatePassword = validateInputs([passwordValidator]);

module.exports = { validateEmail, validatePassword };
