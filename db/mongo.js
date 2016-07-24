var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weather');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// define the structure of data in weather collection (analog to SQL schema)
var weatherSchema = mongoose.Schema({
  name: String,
  description: String,
  humidity: Number,
  temp: Number,
  tom: Number
});

// define the model of weather collection (analog to SQL table)
var Weather = mongoose.model('Weather', weatherSchema);

exports.weather = Weather;