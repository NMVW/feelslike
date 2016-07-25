(function () {
  
  'use strict';
  
  angular.module('search')
  .directive('searchPanel', function () {
    return {
      templateUrl: 'search.html',
      scope: '=',
      controller: SearchController,
      controllerAs: 'search'
    };
  });
  
  function SearchController () {
    var self = this;
    
    
  };
  
})();
