var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
  });

  // new user route loads newUser.html
  app.get("/newuser", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/newUser.html"));
  });

  app.get("/dashboard", accessProtectionMiddleware, function(req, res) {
    res.sendFile(path.join(__dirname, "./public/dashboard.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404");
  });

  // Checks if a user is logged in
  const accessProtectionMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        message: "must be logged in to continue"
      });
    }
  };
};
