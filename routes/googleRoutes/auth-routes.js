var passport = require("passport");

module.exports = function (app) {

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    }
    ));

  app.get("/auth/logout", function (req, res) {
    //handle with passport
    res.send("logging out");
  });

  // This is where users point their browsers in order to get logged in
  // This is also where Google sends back information to our app once a user authenticates with Google
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: true }),
    (req, res) => {
      console.log("wooo we authenticated, here is our user object:", req.user);
      // res.json(req.user);
      res.redirect("/dashboard");
    }
  );
};
