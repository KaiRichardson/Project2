require("dotenv").config();
var path = require("path");
var express = require("express");
var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
var session = require("express-session");

var app = express();
var port = process.env.PORT || 8050;

// Serve static files
app.use(express.static(__dirname + "/public"));

// // Add session support
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default_session_secret",
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((userDataFromCookie, done) => {
//   done(null, userDataFromCookie);
// });

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

// START GOOGS STUFF ----------------------------------------------------------------------/
require("./config/passport-setup.js")(app);

// Create API endpoints

// This is where users point their browsers in order to get logged in
// This is also where Google sends back information to our app once a user authenticates with Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  (req, res) => {
    console.log("wooo we authenticated, here is our user object:", req.user);
    // res.json(req.user);
    res.redirect("https://frozen-spire-30925.herokuapp.com/dashboard");
  }
);

// Load index page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.get("/dashboard", accessProtectionMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "./public/dashboard.html"));
});

// Start server
var server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
