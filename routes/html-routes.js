var path = require("path");
var db = require("../models");

// var auth = require("../config/passport-setup.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log("i hit '/'");
    // console.log(path.join(__dirname, "../public/login.html"));
    //if user is authenticated send to new user page
    /* console.log(req.session); */
    /* res.cookie("user" + req.session.passport.user.id); */
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // // new user route loads user creation page
  app.get("/newuser", function(req, res) {
    console.log(req.session.userid);
    res.cookie("user" + req.session.userid);
    res.sendFile(path.join(__dirname, "../public/newUser.html"));
  });
  
  // dashboard route loads user info page
  app.get("/dashboard", function(req, res) {
    console.log("i hit 'dashboard'");
    console.log(req.session.userid);
    /* console.log("user id is: " + req.session.passport.user.id); */  
    res.cookie("user" + req.session.userid);
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });
  
  // new user route loads user info update page
  app.get("/updateUser", function(req, res) {
    console.log(req.session.userid);
    res.cookie("user" + req.session.userid);
    res.sendFile(path.join(__dirname, "../public/updateUser.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendStatus("404");
  });
};
