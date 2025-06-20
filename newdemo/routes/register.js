var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* Set up for Registration */

// GET /register → register.hbs 보여주기
router.get('/', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST /register → 사용자 등록 처리
router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  // User.register 는 passport-local-mongoose 의 메서드
  User.register(new User({ username: username }), password, (err, user) => {
    if (err) {
      console.log('Registration error:', err);
      return res.render('register', { title: 'Register', error: err.message });
    }
    // 등록 성공 → 자동 로그인
    passport.authenticate('local')(req, res, () => {
      res.redirect('/'); // 회원가입 후 이동할 경로
    });
  });
});

module.exports = router;
