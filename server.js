// This file should be named `server.js`

const express = require('express');

const app = express();  
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname + '/public'));

// Serve a test API endpoint
// This is just to test your API -- we're gonna delete this endpoint later
app.get('/test', (req, res) => {  
  res.send('Your api is working!');
});

// Start server
const server = app.listen(port, function() {  
  console.log('Server listening on port ' + port);
});