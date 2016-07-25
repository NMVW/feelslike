(function () {
  
  'use strict';
  
  angular.module('app')
  .factory('Cities', function($http) {
    
    var picFinder = function(city, cb) {
      
      getCoordinates(city, function(latLon) {
        getRef(latLon, function(reference) {
          getPic(reference, function(html) {
            console.log(html);
            cb(html);
          });
        });
        
      });
      // look in cityWeather data an
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
      
      function getRef(latLon, cb) {
        $http({
          method: 'GET',
          url: 'http://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latLon[0]+','+latLon[1]+'&radius=1500&key='+placesAPI_KEY
        }).then(function(data) {
          var reference = data.results[1].photos[0].photo_reference;
          cb(reference);
        });   
      }
      
      function getPic(ref, cb) {
        $http({
          method: 'GET',
          url: 'http://maps.googleapis.com/maps/api/place/photo?photo_reference'+ref+'&maxheight=100&key='+placesAPI_KEY
        }).then(function(html) {
          //extract img from url and send in cb
          console.log('here is random pic object:');
          console.log(typeof html);
          console.log(html);
          cb(html);
          // take the image url and append it to body
          
        });
      }
    };
     
    var sameWeatherCities = ['San Diego','San Francisco', 'Orlando','St. Paul'];
    
    return {
      picFinder: picFinder,
      sameCities: sameWeatherCities
      
    };
  });
  
})();
