const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());passport.use(User.createStrategy());//abstraccion de la logica de auth auten
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

module.exports = passport;