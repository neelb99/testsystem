var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// Google OAuth code

passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(
 new GoogleStrategy(
  {
   clientID: "54840836267-8k94rdoo01o5barchm8akbvu7tkku07b.apps.googleusercontent.com",
   clientSecret: "P_EHI-Ms2iiI--qCwfyXmU06",
   callbackURL: "https://testingassignment.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   done(null, userData);
  }
 )
);