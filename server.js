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

// Routs
// require("./routes/html-routes")(app);

// Google Routs
require("./config/passport-setup.js")(app);
require("./routes/googleRoutes/auth-routes.js")(app);


// // Load index page
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
