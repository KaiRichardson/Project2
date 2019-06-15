// START GOOGS STUFF ----------------------------------------------------------------------/
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Checks if a user is logged in
  var accessProtectionMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        message: "must be logged in to continue"
      });
    }
  };

  passport.use(
    new GoogleStrategy(
      {
        //options for google api
        clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_TEST_APP_URL
      },
      function(accessToken, refreshToken, profile, done) {
        //pass call back func
        console.log("passport call back fired");
        console.log(profile);
        return done(null, {
          profile: profile,
          token: accessToken
        });
      }
    )
  );
};
