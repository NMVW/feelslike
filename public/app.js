// var API_KEY = require('./key.js');
var wAPI_KEY = 'e';
var gAPI_KEY = '6';

angular.module('feelslike', [])

.controller('MainController', function($scope, Storage) {

  $scope.getWeather = function(city) {
    Storage.checkWeather(city, function(data) {
      data.main.temp = Math.round(data.main.temp - 273.15);
      data.wind.speed = Math.round(data.wind.speed * 3.6);
      $scope.cityWeather = data;
    });
  };
  
  $scope.cities = Storage.sameCities;
    
  console.log('Main controller is running');
})
.factory('Storage', function($http) {
  
  var checkWeather = function(place, cb) { 
    place = place.replace(/ /g, '+');
    
    // need to get coordinates from input place to find
    // neighboring cities' weather data
    
    getCoordinates(place, function(GEOdata) {
      console.log('geocoding data:');
      console.log(GEOdata);
    });
    
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+place+'&APPID=' + wAPI_KEY
    }).then(function(res) {
      console.log('weather data:');
      console.log(res.data);
      cb(res.data);
    }, function(err) {
      console.log(err);
    });
  };
  // getting LIVE weather data from OpenWeatherMap API
  // http://openweathermap.org/current
  
  var getCoordinates = function(city, cb) {
    $http({
      method: 'GET',
      url: 'http://api.opencagedata.com/geocode/v1/json?q='+city+'&key='+gAPI_KEY
    }).then(function(res) {
      console.log(res.results);
      cb(res.results);
    }, function(err) {
      console.log(err);
    });
  };
  
  var sameWeatherCities = ['San Diego','San Francisco', 'Orlando','St. Paul'];
  var cityFinder = function(weather) {
    // request all cities who match weather params
  };
  
  return {
    checkWeather: checkWeather,
    sameCities: sameWeatherCities
  };
})
.factory()
.run();