const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { register } = require('../controllers/user.controller');

router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  register
);

module.exports = router;
