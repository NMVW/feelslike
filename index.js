var express = require('express');
// var partials = require('express-partials');

// var http = require('http');
// var request = require('request');

var app = express();

var port = process.env.PORT || 4555;

// app.configure(function() {
//   app.use(express.static(__dirname + 'index.html'));
// }); CAN ONLY USE with express-partials module

app.get('/', function(req, res) {
  res.json('Oh, hey there. Nothing to see here, check back later!');
});

app.listen(port);

// var port = process.env.PORT || 4555;

// http.createServer(function(req, res) {
  
//   res.end(function() {
//     console.log('message received');
//     console.log('Server now listening on port ' + port);
    
//   });
  
// }).listen(4555);
