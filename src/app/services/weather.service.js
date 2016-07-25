(function () {
  
  'use strict';
  
  angular.module('app')
  .factory('Weather', function ($http) {
    
    var getCities = function (place, cb) { 
      place = place.replace(/ /g, '+');
      
      // need to get coordinates from input place to find
      // neighboring cities' weather data
      getCoordinates(place, function (GEOdata) {
        getWeather(GEOdata);
      });
      
      // get the weather data for cities around coordinates
      function  getWeather(latLon) {
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/find?lat='+latLon[0] +'&lon='+ latLon[1]+'&cnt='+cityCount+'&APPID=' + wAPI_KEY
        }).then(function (res) {
          cb(res.data);
        }, function (err) {
          console.log(err);
        });   
      }
    };
    // getting LIVE weather data from OpenWeatherMap API
    // http://openweathermap.org/current
    
    function  getCoordinates(city, cb) {
      $http({
        method: 'GET',
        url: 'http://api.opencagedata.com/geocode/v1/json?q='+city+'&key='+gAPI_KEY
      }).then(function (res) {
        var lat = res.data.results[0].bounds.northeast.lat;
        var lon = res.data.results[0].bounds.northeast.lng;
        cb([lat,lon]);
      }, function (err) {
        console.log(err);
      });
    }
   
    // retrieve a single city's data
    var getCityWeather = function (city, cb) {
      cit = city.replace(/ /g, '+');
      $http({
          method: 'GET',
          url: '/weather', //'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=' + wAPI_KEY
        }).then(function (res) {
          console.log('weather data:');
          console.log(res.data);
          cb(res.data);s
        }, function (err) {
          console.log(err);
        }); 
    }; 
    
    return {
      getCityWeather: getCityWeather,
      getCities: getCities
    };
  });
  
})();
