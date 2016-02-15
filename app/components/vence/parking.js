'use strict';

angular.module('myApp.parking', [
        'myApp.parking.lotService'
    ])
    .factory('parking', function($http, $injector) {
        //return lotService.get();
        return $http.get('/api')
            .then(function () {
                return $injector.get('api');
            }, function () {
                return $injector.get('localStorage');
            });
    })

    .factory('localStorage', function ($q, lotService, Vehicle) {
        'use strict';

        var STORAGE_ID = 'vence-parking-state';

        var store = {
            lot: lotService.get(),

            _hydrate: function(data) {
                var places = [];
                var vehicle = null;
                for (var i = 0; i < data.levels.length; i++) {
                    places = data.levels[i].places;
                    for (var j = 0; j < places.length; j++) {
                        if (places[j].vehicle != null) {
                            vehicle = new Vehicle(places[j].vehicle.licence, places[j].vehicle.type);
                            store.lot.put(vehicle, i, j);
                        } else {
                            for (var k = 0; k < places[j].subPlaces.length; k++) {
                                vehicle = new Vehicle(places[j].subPlaces[k].vehicle.licence, places[j].subPlaces[k].vehicle.type);
                                store.lot.put(vehicle, i, j);
                            }
                        }
                    }
                }
            },

            _getFromLocalStorage: function () {
                var local = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
                if (local.length == 0) {
                    local = store.lot;
                }
                return local;
            },

            _saveToLocalStorage: function (lot) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(lot));
            },

            delete: function (vehicle) {
                var deferred = $q.defer();

                store.lot.remove(vehicle);

                store._saveToLocalStorage(store.lot);
                deferred.resolve(store.lot);

                return deferred.promise;
            },

            get: function () {
                var deferred = $q.defer();

                var local = store._getFromLocalStorage();
                store._hydrate(local);
                deferred.resolve(store.lot);

                return deferred.promise;
            },

            insert: function (vehicle) {
                var deferred = $q.defer();

                store.lot.add(vehicle);

                store._saveToLocalStorage(store.lot);
                deferred.resolve(store.lot);

                return deferred.promise;
            }

        };

        return store;
    });
