var tolerance = .05;
var cityCount = 100;

angular.module('feelslike', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /index.html
  $urlRouterProvider.otherwise('/index.html');
  
  // Future signup and signin states
  // $stateProvider
  //   .state('signup', {
  //     url: '/signup',
  //     template: '<signup />'
  //   })
  //   .state('signin', {
  //     url: '/signin',
  //     template: '<signin />'
  //   });
});
