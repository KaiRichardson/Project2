var passport = require("passport");

module.exports = function(app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/logout", function(req, res) {
    //handle with passport
    res.send("logging out");
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: true }),
    (req, res) => {
      console.log(
        `wooo we authenticated, here is our user object: ${req.user}`
      );
      // res.json(req.user);
      res.redirect("/");
    }
  );
};
