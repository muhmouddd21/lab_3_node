const { body, validationResult } = require('express-validator');
const User = require('../models/user');



const validateEmail = [
  body('email')
    .trim() // Remove extra whitespace
    .normalizeEmail() // Standardize email format (e.g., lowercase)
    .isEmail()
    .withMessage('Please provide a valid email'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); 
  }
];
const validatePassword =[
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/\d/).withMessage('Password must contain a number')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special characte'),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next(); 
    }

]

module.exports = {
    validateEmail,
    validatePassword
}