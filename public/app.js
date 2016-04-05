// var API_KEY = require('./key.js');
var wAPI_KEY = process.env.wAPI_KEY;
var gAPI_KEY = process.env.gAPI_KEY;
var tolerance = .05;
var cityCount = 10;

angular.module('feelslike', [])

.controller('MainController', function($scope, Weather, Cities) {

  // $scope.keys = Keys.getKeys();
  $scope.cityWeather = function(city) {
    // parse data from OpenWeatherMap
    Weather.getCityWeather(city, function(data) {
      data.main.temp = Math.round(data.main.temp - 273.15);
      data.wind.speed = Math.round(data.wind.speed * 3.6);
      $scope.weather = data;
    });
  };
  
  $scope.surroundingWeather = function(city) {
    
    Weather.getCities(city, function(citiesData) {
      
      // parse data from OpenWeatherMap
      $scope.nearbyCities = citiesData.list
        .filter(function(cityData) {
          // console.log(cityData);
          // console.log($scope.weather);
          // filter out too different weathers
          var dH = Math.abs(cityData.main.humidity - $scope.weather.main.humidity);
          var dT = Math.abs(cityData.main.temp - 273.15 - $scope.weather.main.temp);
          console.log('Difference in humidity =' +dH+' for '+cityData.name);
          console.log('Differenc in temp = '+dT+' for ' + cityData.name);
          return (dH/$scope.weather.main.humidity <= tolerance) && (dT/$scope.weather.main.temp <= tolerance);
        }).map(function(matched) {
          // list of weather-matched city names
          return matched.name;
        });
    
      console.log('$scope cities:');
      // console.log($scope);
      console.log($scope.nearbyCities);
    });
  };

  $scope.cityUtils = Cities;
    
  console.log('Main controller is running');
})
.factory('Weather', function($http) {
  
  var getCities = function(place, cb) { 
    place = place.replace(/ /g, '+');
    
    // need to get coordinates from input place to find
    // neighboring cities' weather data
    getCoordinates(place, function(GEOdata) {
      var lat = GEOdata.data.results[0].bounds.northeast.lat;
      var lon = GEOdata.data.results[0].bounds.northeast.lng;
      getWeather([lat,lon]);
    });
    
    // get the weather data for cities around coordinates
    function getWeather(latLon) {
      $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/find?lat='+latLon[0] +'&lon='+ latLon[1]+'&cnt='+cityCount+'&APPID=' + wAPI_KEY
      }).then(function(res) {
        cb(res.data);
      }, function(err) {
        console.log(err);
      });   
    }
  };
  // getting LIVE weather data from OpenWeatherMap API
  // http://openweathermap.org/current
  
  function getCoordinates(city, cb) {
    $http({
      method: 'GET',
      url: 'http://api.opencagedata.com/geocode/v1/json?q='+city+'&key='+gAPI_KEY
    }).then(function(res) {
      // console.log(res);
      cb(res);
    }, function(err) {
      console.log(err);
    });
  }
 
  // retrieve a single city's data
  var getCityWeather = function(city, cb) {
    cit = city.replace(/ /g, '+');
    $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=' + wAPI_KEY
      }).then(function(res) {
        console.log('weather data:');
        console.log(res.data);
        cb(res.data);
      }, function(err) {
        console.log(err);
      }); 
  }; 
  
  return {
    getCityWeather: getCityWeather,
    getCities: getCities
  };
})

.factory('Cities', function() {
  
  var cityFinder = function(cityData) {
    // look in cityWeather data an
    
  
    return citiesOfSameWeather;
  };
   
  var sameWeatherCities = ['San Diego','San Francisco', 'Orlando','St. Paul'];
  
  return {
    cityFinder: cityFinder,
    sameCities: sameWeatherCities
  };
})
.factory('Keys', function($http) {
  
  var getKeys = function() {
    return $http({
      method: 'GET',
      url: '/'
    }).then(function(keys) {
      console.log('client received keys:');
      console.log(keys);
      return keys;
    });
  };
  
  return {
    getKeys: getKeys
  };
})
.run();