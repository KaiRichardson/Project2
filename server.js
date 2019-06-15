require("dotenv").config();
var express = require("express");
var session = require("express-session");

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

// Starting the server
db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});

module.exports = app;
