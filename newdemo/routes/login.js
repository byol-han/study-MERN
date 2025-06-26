var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* Set up for Login */
router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/', (req, res, next) => {
  // passport.authenticate('local', (err, user, info)=> {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: true,
  // });

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // If there is an error, render the login page with the error message
      return res.render('login', { title: 'Login', error: err.message });
    }
    if (!user) {
      // If there is no username or incorrect password, render the login page with the error message
      return res.render('login', { title: 'Login', error: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.render('login', { title: 'Login', error: err.message });
      }
      // Redirect to the home page after successful login
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
