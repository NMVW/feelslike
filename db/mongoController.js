var model = require('./mongo');

module.exports = {
  get: function(cb) {
    model.weather.find(function(err, weathers) {
      if (err) return console.error(err);
      console.log(weathers);
      cb(weathers);
    });
    
  },
  post: function(data) {
    
    // create an instance of weather model
    var weather = new model.weather(data);
    
    // save weather instance to database
    weather.save(function(err, weather) {
      if (err) return console.error(err);
      console.log(weather);
    });
  }
};

// var wAPI_KEY = 'ee51372e62d8ae6720a7f93f3c48aed3';
// var getCityWeather = function(city, cb) {
//   cit = city.replace(/ /g, '+');
//   $http({
//       method: 'GET',
//       url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=' + wAPI_KEY
//     }).then(function(res) {
//       console.log('weather data:');
//       console.log(res.data);
//       cb(res.data);
//     }, function(err) {
//       console.log(err);
//     }); 

var test = {name:'Orlando',description:'sounds nice',humidity: 56, temp: 23, tom:13453262346};

module.exports.post(test);