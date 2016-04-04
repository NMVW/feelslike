var express = require('express');
// var partials = require('express-partials');

// var http = require('http');
// var request = require('request');

var app = express();

var port = process.env.PORT || 4555;

// app.configure(function() {
//   app.use(express.static(__dirname + 'index.html'));
// }); CAN ONLY USE with express-partials module
app.use(express.static('public'));

app.get('/', function(req, res) {
  console.log('GET request to root');
  res.render('index.html');
});

app.post('/', function(req, res) {
  console.log('POST request to root');
  res.send('Client trying to POST');
});

app.listen(port);

// var port = process.env.PORT || 4555;

// http.createServer(function(req, res) {
  
//   res.end(function() {
//     console.log('message received');
//     console.log('Server now listening on port ' + port);
    
//   });
  
// }).listen(4555);
