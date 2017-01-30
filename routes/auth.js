// this adds the ability to register users.

const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

router.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});

router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

// this route provides a page to log in
router.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});

//this checks if the user is already logged in
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
  })
);

//this logsout the user and then redirects the user to the homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
