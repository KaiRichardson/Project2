var passport = require("passport");

module.exports = function(app) {
  app.get("/auth/logout", function(req, res) {
    //handle with passport
    res.send("logging out");
  });

  // This is where users point their browsers in order to get logged in
  // This is also where Google sends back information to our app once a user authenticates with Google
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      session: true,
      scope: ["profile", "email"]
    }),
    (req, res) => {

      var isIdUnique = id =>
        db.Profile.findOne({ where: { google_id } })
          .then(token => token !== null)
          .then(isUnique => isUnique);

      if (req.user[2]._json.sub) {
      } else {
      }
      // console.log("wooo we authenticated, here is our user object:", req.user);
      res.json(req.user);
      // res.redirect("https://frozen-spire-30925.herokuapp.com/dashboard");
    }
  );
};
