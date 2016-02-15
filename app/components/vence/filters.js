angular.module('myApp.filters', [])

    .filter('userFilter', ['myApp.filters.filterStabilize', function(stabilize) {

        return stabilize(function(input, levelFilters, typeFilters, textFilter) {

            var out = [];

            angular.forEach(input, function(location) {
                var add = true;

                var levelCondition = false;
                var levelIgnored = true;
                angular.forEach(levelFilters, function (filter) {
                    if (filter.selected) {
                        levelCondition = levelCondition || (filter.level.getFloor() == location.level.getFloor());
                        levelIgnored = false;
                    }
                });

                var typeCondition = false;
                var typeIgnored = true;
                angular.forEach(typeFilters, function (filter) {
                    if (filter.selected) {
                        typeCondition = typeCondition || (filter.type == location.vehicle.getType());
                        typeIgnored = false;
                    }
                });

                var textCondition = true;
                if (textFilter != '') {
                    var e = new RegExp(textFilter, 'i');
                    textCondition = e.test(location.vehicle.getLicence());
                }

                add = (levelCondition || levelIgnored) && (typeCondition || typeIgnored) && textCondition;

                if (add) {
                    out.push(location);
                }

            });

            return out;
        });

    }])

    .factory('myApp.filters.filterStabilize', [
    'myApp.filters.memoize',
    function(memoize) {
        function service(fn) {
            function filter() {
                var args = [].slice.call(arguments);
                // always pass a copy of the args so that the original input can't be modified
                args = angular.copy(args);
                // return the `fn` return value or input reference (makes `fn` return optional)
                var filtered = fn.apply(this, args) || args[0];
                return filtered;
            }
            var memoized = memoize(filter);
            return memoized;
        }
        return service;
    }
])
    .factory('myApp.filters.memoize', [
        function() {
            function service() {
                return memoizeFactory.apply(this, arguments);
            }
            function memoizeFactory(fn) {
                var cache = {};
                function memoized() {
                    var args = [].slice.call(arguments);
                    var key = JSON.stringify(args);
                    var fromCache = cache[key];
                    if (fromCache) {
                        return fromCache;
                    }
                    cache[key] = fn.apply(this, arguments);
                    return cache[key];
                }
                return memoized;
            }
            return service;
        }
    ]);

