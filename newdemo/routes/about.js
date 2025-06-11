var express = require('express');
var router = express.Router();

const name = 'Byol';

router.get('/', function (req, res, next) {
  res.render('about', {
    name: name,
    passions: ['job-searching', ''],
    hobbies: ['swimming', ' hiking'],
  });
});

module.exports = router;
