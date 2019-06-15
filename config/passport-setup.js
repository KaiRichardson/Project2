var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var session = require("express-session");

module.exports = function(app) {
  // Add session support
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "default_session_secret",
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // // Checks if a user is logged in
  // var accessProtectionMiddleware = (req, res, next) => {
  //   if (req.isAuthenticated()) {
  //     next();
  //   } else {
  //     res.status(403).json({
  //       message: "must be logged in to continue"
  //     });
  //   }
  // };

  passport.use(new GoogleStrategy(  
    {
      clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_TEST_APP_URL,
      scope: ['email'],
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
      return cb(null, profile);
    },
  ));
};
