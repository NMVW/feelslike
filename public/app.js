// var API_KEY = require('./key.js');
var API_KEY = '';
console.log(API_KEY);

angular.module('feelslike', [])

.controller('MainController', function($scope, Storage) {
  // $scope.names = [Robin, Bryan, Nick];
  console.log(Storage.names);
  $scope.names = Storage.names;
  $scope.print = Storage.print;
  $scope.checkWeather = Storage.checkWeather;
  
  console.log('Main controller is running');
})
.factory('Storage', function($http) {
  var cities = ['San Francisco','New York', 'St. Paul'];
  
  var print = function(place) {
    console.log(place);
  };
  
  var checkWeather = function(place) {
    
    place = place.replace(/ /g, '+');
    
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+place+'&APPID=' + API_KEY
    }).then(function(res) {
      console.log(res.data);
    }, function(err) {
      console.log(err);
    });
  };
  
  // console.log(API_KEY);
  // getting LIVE weather data from OpenWeatherMap API
  // http://openweathermap.org/current
  
  return {
    print: print,
    names: cities,
    checkWeather: checkWeather
  };
})
.run();