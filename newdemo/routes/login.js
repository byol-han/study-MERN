var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* Set up for Login */
router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
