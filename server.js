var express = require('express');
// var partials = require('express-partials');

// var http = require('http');
// var request = require('request');

var app = express();

var port = process.env.PORT || 4555;

// var wAPI_KEY = process.env.wAPI_KEY;
// var gAPI_KEY = process.env.gAPI_KEY;
// app.configure(function() {
//   app.use(express.static(__dirname + 'index.html'));
// }); CAN ONLY USE with express-partials module
app.use(express.static('public'));

// app.get('*', function(req, res) {
//   console.log('retrieving API keys');
//   res.send([gAPI_KEY, wAPI_KEY]);
// });

// app.post('/', function(req, res) {
//   console.log('POST request to root');
//   res.send('Client trying to POST');
// });

app.listen(port);

// var port = process.env.PORT || 4555;

// http.createServer(function(req, res) {
  
//   res.end(function() {
//     console.log('message received');
//     console.log('Server now listening on port ' + port);
    
//   });
  
// }).listen(4555);
