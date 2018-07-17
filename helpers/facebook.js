
const passport         = require('passport');
const FacebookStrategy = require('passport-facebook');
const User             = require('../models/User');

passport.use(new FacebookStrategy({
  clientID: "639406236427569",                        //process.env.FACEBOOK_APP_ID,
  clientSecret: "060c5339d49e472870d658ba5089434b",   //process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.FindOrcreate({ username: profile.displayName }, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
}
));

passport.serializeUser(function(user,cb){
  cb(null, user)
});

passport.deserializeUser(function(user,cb){
  cb(null, user)
})  

module.exports = passport;