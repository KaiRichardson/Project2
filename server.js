// server.js

require('dotenv').config();
const express = require('express');  
const path = require("path");
const passport = require('passport');  
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();  
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname + '/public'));

// Add session support
app.use(session({  
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());  
app.use(passport.session());  
// This will tell passport what to put into client-side cookies
// We are just saving the entire user object for this tutorial
// Normally, we'd usually want to save just a user_id
passport.serializeUser((user, done) => {  
  done(null, user);
});
passport.deserializeUser((userDataFromCookie, done) => {  
  done(null, userDataFromCookie);
});

// Set up passport strategy
passport.use(new GoogleStrategy(  
  {
    clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
    callbackURL: 'https://frozen-spire-30925.herokuapp.com/auth/google/callback',
    scope: ['email', 'profile'],
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(`Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user: ${profile}`);
    return cb(null, profile);
  },
));

// Create API endpoints
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});

// This is where users point their browsers in order to get logged in
// This is also where Google sends back information to our app once a user authenticates with Google
app.get('/auth/google/callback',  
  passport.authenticate('google', { failureRedirect: '/login.html', session: false }),
  (req, res) => {
    console.log(`wooo we authenticated, here is our user object: ${req.user}`);
    // Send the user data back to the browser for now
    res.json(req.user);
  }
);

// Start server
const server = app.listen(port, function() {  
  console.log(`Server listening on port ${port}`);
});