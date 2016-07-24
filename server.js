var express = require('express');
var bodyParser = require('body-parser');

// MONGO (mongoose)
var db = require('./db/mongoController');

// MYSQL (sequelize)

var app = express();

var port = process.env.PORT || 4555;

app.use(express.static('public'));
app.use(bodyParser.json()); // parses the incoming data to JSON

app.get('/weather', function(req,res) {
  // res.send('this is GET weather');
  db.get(function(data) {
    // res.send(data);
    res.send(data);
  });
});

app.post('/weather', function(req,res) {
  res.send('this is POST weather');
  db.post();
});

// app.get('*', function(req, res) {
//   console.log('retrieving API keys');
//   res.send([gAPI_KEY, wAPI_KEY]);
// });

// app.post('/', function(req, res) {
//   console.log('POST request to root');
//   res.send('Client trying to POST');
// });

app.listen(port);