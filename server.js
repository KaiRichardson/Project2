require("dotenv").config();
var express = require("express");

var app = express();
var port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname + "/public"));

// Routes
require("./routes/html-routes")(app);

// Google Routes
require("./config/passport-setup.js")(app);
require("./routes/googleRoutes/auth-routes.js")(app);


// Start server
var server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});

module.exports = app;