require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const path = require("path");

// local
var db = require("./models");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname + "/public"));

// Add session support
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false
  })
);

// Add passport support
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((userDataFromCookie, done) => {
  done(null, userDataFromCookie);
});

// Routes
require("./routes/student-api-routes")(app);
require("./routes/html-routes")(app);

// Checks if a user is logged in
module.exports = accessProtectionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: "must be logged in to continue"
    });
  }
};

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
    (accessToken, refreshToken, profile, cb) => {
      console.log(
        `Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user ${profile}`
      );
      return cb(null, profile);
    }
  )
);

// Create API endpoints
// This is where users point their browsers in order to get logged in
// This is also where Google sends back information to our app once a user authenticates with Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  (req, res) => {
    console.log(`wooo we authenticated, here is our user object: ${req.user}`);
    // res.json(req.user);
    res.redirect("/");
  }
);

// Start server
const server = app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
