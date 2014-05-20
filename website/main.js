(function() {

  var app = angular.module('GovUaCatalog', ['$strap.directives']);
  
  app.
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
          redirectTo: function () {return "/home";}
        }).
        when('/home', {
          templateUrl: 'index.html',
          controller: HomeCtrl,
        }).
        when('/resources/', {
          templateUrl: 'views/resources.html',
          controller: resources
        }).
        when('/resources/:resource_id', {
          templateUrl: 'views/resource.html',
          controller: resource
        })
  }]);

  app.controller('appCtrl', function($scope, $route, $location) {
  });

  function apiToAngular($q, $rootScope, apiFunction, params) {
    var func = function (params) {
      var deferred = $q.defer();
      apiFunction(params, function onResources(resources) {
        $rootScope.$apply(function() {
          deferred.resolve(resources);
        });
      }, function onError() {
      });
      return deferred.promise;
    };
    return func;
  }

  app.factory('ResourcesService', function($q, $rootScope) {
    return {
      getResources: apiToAngular($q, $rootScope, GovUaCatalog.getResources),
      getResource:  apiToAngular($q, $rootScope, GovUaCatalog.getResource)
    }
  });

  function HomeCtrl($scope) {}
  
  function resources($scope, ResourcesService, $routeParams) {
    $scope.loading = true;
    ResourcesService.getResources().then(function (resources) {
      $scope.loading = false;
      $scope.resources = resources.items;
    }, function onError(error) {
      $scope.loading = false;
    });
  }

  function resource($scope, ResourcesService, $routeParams) {
    $scope.loading = true;
    ResourcesService.getResource().then(function (resource) {
      $scope.loading = false;
      $scope.resource = resources.items;
    }, function onError(error) {
      $scope.loading = false;
    });
  }

})();
