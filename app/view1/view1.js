'use strict';

angular.module('myApp.view1', [
    'ngRoute',
    'myApp.parking',
    'myApp.filters',
    'angularUtils.directives.dirPagination'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    resolve: {
      store: function (parking) {
          return parking.then(function (module) {
              module.get();
              return module;
          });
      }
    }
  });
}])

.controller('View1Ctrl', function($scope, Vehicle, $filter, store) {
    $scope.lot = store.lot;
    $scope.vehicle = { licence: null, type: null };
    $scope.levelFilters = [];
    var levels = store.lot.getLevels();
    for (var i = 0; i < levels.length; i++) {
        $scope.levelFilters.push({level: levels[i], selected: false, class: ''});
    }
    $scope.typeFilters = [];
    var types = Vehicle.types;
    for (i = 0; i < types.length; i++) {
        $scope.typeFilters.push({type: types[i], selected: false, class: ''});
    }

    $scope.requestEntry = function () {
        var vehicle = new Vehicle($scope.vehicle.licence.trim(), $scope.vehicle.type);

        if (!vehicle.getLicence()) {
            return;
        }

        $scope.saving = true;
        store.insert(vehicle)
            .then(function success() {
                $scope.vehicle.licence = '';
                $scope.vehicle.type = null;
            })
            .finally(function () {
                $scope.saving = false;
            });
    };

    $scope.toggleLevelFilter = function (i) {
        $scope.levelFilters[i].selected = !$scope.levelFilters[i].selected;
        $scope.levelFilters[i].class = $scope.levelFilters[i].selected? 'selected' : '';
    };

    $scope.toggleTypeFilter = function (i) {
        $scope.typeFilters[i].selected = !$scope.typeFilters[i].selected;
        $scope.typeFilters[i].class = $scope.typeFilters[i].selected? 'selected' : '';
    };
});