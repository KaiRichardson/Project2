require("dotenv").config();
var express = require("express");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(express.static(__dirname + "/public"));

// Routes
require("./routes/student-api-routes")(app);
require("./routes/html-routes")(app);

// START GOOGS STUFF ----------------------------------------------------------------------/
require("./config/passport-setup.js")(app);
require("./routes/googleRoutes/auth-routes.js")(app);

// END GOOGLE STUFF -------------------------------------------------------------------------------/
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
