const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const sendActivationLink = require('../helpers/mailer').sendActivationLink;

const errDict = {
  UserExistsError: 'Este usuario ya existe'
}

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return res.redirect('/profile');
  return next();
}

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  return res.redirect('/login');
}


router.get('/activation', isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {active: true}, {new: true})
  .then(user=>{
    res.send('Activado, gracias ' +  user.username);
  })
  .catch(e=>next(e))
})


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  if(req.body.password !== req.body.repeatpassword) {
    req.body.err = 'Tu password no coincide';
    res.render('auth/signup', req.body);
  }
  User.register(req.body, req.body.password)
  .then(user=>{
    sendActivationLink(user);
    res.redirect('/login');
  })
  .catch(e=>{
    req.body.err = errDict[e.name];
    res.render('auth/signup', req.body);
  });
});

router.get('/login', isAuth, (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/profile');
});

router.post('/logout',  (req, res, next) => {
  req.logout();
  res.redirect('/login');
});



module.exports = router;