(function () {
  
  'use strict';
  
  angular.module('dashboard')
  .directive('dashboardPanel', function () {
    return {
      templateUrl: 'dashboard.html',
      scope: '=',
      controller: DashboardController,
      controllerAs: 'dashboard'
    };
  });
  
  function DashboardController (Weather, Cities) {
    var self = this;
    
    // parse data from OpenWeatherMap
    self.cityWeather = function (city) {
      // Cities.picFinder(city, function(imgURL) {
      //   console.log(imgURL);
      // });// extract pics from city + nearby
      
      Weather.getCityWeather(city, function(data) {
        data.main.temp = Math.round(data.main.temp - 273.15);
        data.wind.speed = Math.round(data.wind.speed * 3.6);
        self.weather = data;
      });
    };
    
    
    // self.surroundingWeather = function(city) {
      
    //   Weather.getCities(city, function(citiesData) {
        
    //     // parse data from OpenWeatherMap
    //     self.nearbyCities = citiesData.list
    //       .filter(function(cityData) {
            
    //         // filter out too different weathers
    //         var dH = Math.abs(cityData.main.humidity - self.weather.main.humidity);
    //         var dT = Math.abs(cityData.main.temp - 273.15 - self.weather.main.temp);
    //         console.log('Difference in humidity =' +dH+' for '+cityData.name);
    //         console.log('Differenc in temp = '+dT+' for ' + cityData.name);
            
    //         return (dH/self.weather.main.humidity <= tolerance) && (dT/self.weather.main.temp <= tolerance);
    //       }).map(function(matched) {
    //         // list of weather-matched city names
    //         return matched.name;
    //       });
      
    //     console.log('self cities:');
    //     // console.log(self);
    //     console.log(self.nearbyCities);
    //   });
    // };
    self.cityUtils = Cities;
    
  };
  
})();
