angular.module('feelslike', [])

.controller('MainController', function($scope, Storage) {
  // $scope.names = [Robin, Bryan, Nick];
  console.log(Storage.names);
  $scope.names = Storage.names;
  $scope.print = Storage.print;
  console.log('Main controller is running');
})
.factory('Storage', function() {
  var cities = ['San Francisco','New York', 'St. Paul'];
  
  var print = function(place) {
    console.log(place);
  };
  
  return {
    print: print,
    names: cities
  };
})
.run();