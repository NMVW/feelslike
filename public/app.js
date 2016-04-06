

var tolerance = .05;
var cityCount = 10;

angular.module('feelslike', [])

.controller('MainController', function($scope, Weather, Cities) {

  // $scope.keys = Keys.getKeys();
  $scope.cityWeather = function(city) {
    // parse data from OpenWeatherMap
    // $scope.cityPic = ???
    Cities.picFinder(city, function(imgURL) {
      console.log(imgURL);
    });// extract pics from city + nearby
    
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
      getWeather(GEOdata);
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
      var lat = res.data.results[0].bounds.northeast.lat;
      var lon = res.data.results[0].bounds.northeast.lng;
      cb([lat,lon]);
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
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latLon[0]+','+latLon[1]+'&radius=1500&key='+placesAPI_KEY
      }).then(function(data) {
        var reference = data.results[1].photos[0].photo_reference;
        cb(reference);
      });   
    }
    
    function getPic(ref, cb) {
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/photo?photo_reference'+ref+'&maxheight=100&key='+placesAPI_KEY
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
})
.run();