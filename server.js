require("dotenv").config();
var express = require("express");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var session = require("express-session");
var path = require("path");

// local
var db = require("./models");

var app = express();
var port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Add session support
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false
  })
);

// Routes
require("./routes/student-api-routes")(app);
require("./routes/html-routes")(app);

// Google routs
require("./config/passport-setup.js")(app);
require("./routes/googleRoutes/auth-routes.js")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

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

// Starting the server, syncing our models ------------------------------------/
var server = app.listen(port, function() {  
  console.log('Server listening on port ' + port);
});

module.exports = app;
