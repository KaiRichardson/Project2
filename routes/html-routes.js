var path = require("path");
// var auth = require("../config/passport-setup.js").accessProtectionMiddleware;

module.exports = function(app) {
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

  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/dashboard", accessProtectionMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404");
  });
};
