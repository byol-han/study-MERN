var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */

var name = 'Byol';
var day = 'Monday';

router.get('/', function (req, res, next) {
  res.render('index', {
    title: name,
    message: 'Hello from Handlebars!',
  });
});

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user.email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);
module.exports = router;
