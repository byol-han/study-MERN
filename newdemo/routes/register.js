var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* Set up for Registration */

// GET /register → show register.hbs
router.get('/', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST /register → register a new user
router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  // User.register is passport-local-mongoose method to register a new user
  User.register(new User({ username: username }), password, (err, user) => {
    if (err) {
      return res.render('register', { title: 'Register', error: err.message });
    }
    // if registration is successful, authenticate the user
    passport.authenticate('local')(req, res, () => {
      res.redirect('/login'); // url to redirect after successful registration
    });
  });
});

module.exports = router;
