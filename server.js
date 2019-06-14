// server.js

const express = require('express');  
const passport = require('passport');  
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();  
const port = process.env.PORT || 8050;

// Serve static files
app.use(express.static(__dirname + '/public'));

// Set up passport strategy
passport.use(new GoogleStrategy(  
  {
    clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
    callbackURL: 'https://frozen-spire-30925.herokuapp.com/auth/google/callback',
    scope: ['email'],
  },
  // This is a "verify" function required by all Passport strategies
  (accessToken, refreshToken, profile, cb) => {
    console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
    return cb(null, profile);
  },
));

// Serve a test API endpoint
app.get('/test', (req, res) => {  
  res.send('Your api is working!');
});

// Start server
const server = app.listen(port, function() {  
  console.log('Server listening on port ' + port);
});