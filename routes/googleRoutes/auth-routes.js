var passport = require("passport");
var db = require("../../models");

// console.log("google auth routes");

module.exports = function(app) {
  /* app.get("/auth/logout", function(req, res) {
    //handle with passport
    res.send("logging out");
  }); */

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );

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
      var studentGoogObj = req.user.profile.id;
      req.session.token = req.user.token;
      req.session.userid = req.user.id; 
      console.log(req.session.userid);
      /* res.redirect("../public/newUser"); */
      /* res.json(studentGoogObj); */
      

      console.log("My googleid is: " + studentGoogObj);
      /* console.log(req.session); */

      //look up in db user google = req.user._json.sub
      db.Students.findOne({
        where: {
          googleId: studentGoogObj
        }
      }).then(function(dbStudent) {
        //if user exists send to dashboard
        if (req, dbStudent) {
          
          console.log("i exists!");
          /* console.log(req.session); */
          console.log("google id: " + req.session.passport.user.id);
          /* res.redirect("../../dashboard.html"); */
          res.redirect("https://frozen-spire-30925.herokuapp.com/dashboard");
          
          return;
          //if user does not exists send to newuser
        } else {
          
          
          console.log("i don't exist");
          console.log("google id: " + req.session.passport.user.id);
          /* res.redirect("../../newUser.html"); */
          res.redirect("https://frozen-spire-30925.herokuapp.com/newUser");
          
          return;
        }
        /* console.log(dbStudent); */
        /* res.json(dbStudent); */
      });
  
      
    }
  );
};
