var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var session = require("express-session");
var db = require("../models");

//
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

  passport.serializeUser((user, done) => {
    done(null, user);
    return;
  });

  passport.deserializeUser((userDataFromCookie, done) => {
    done(null, userDataFromCookie);
    return;
  });

  // Set up passport strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
        callbackURL:
          "https://frozen-spire-30925.herokuapp.com/auth/google/callback",
        scope: ["email"]
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(
        //   "Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:",
        //   profile
        // );
        db.Students.findOrCreate({ where: { googleId: profile.id } })
          .then(function (user) {
            console.log("===== FOUND THE USER IN OUR DB! =======");
            console.log("User id: " + user[0].id); // this is the user id (as it is found in our db)
            return done(null, {
              profile: profile,
              token: accessToken,
              id: user[0].id 
            });
          });
        /* return cb(null, profile); */
      }
    )
  );
};
