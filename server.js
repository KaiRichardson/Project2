require("dotenv").config();
var path = require("path");
var express = require("express");

var db = require("./models");

var app = express();
var port = process.env.PORT || 8050;

// Serve static files
app.use(express.static(__dirname + "/public"));

// Routs
require("./routes/html-routes")(app);

// Google Routs
require("./config/passport-setup.js")(app);
require("./routes/googleRoutes/auth-routes.js")(app);

// Checks if a user is logged in
// var accessProtectionMiddleware = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).json({
//       message: "must be logged in to continue"
//     });
//   }
// };

// Load index page
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/login.html"));
// });

// app.get("/dashboard", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/dashboard.html"));
// });

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(port, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      port,
      port
    );
  });
});

module.exports = app;
