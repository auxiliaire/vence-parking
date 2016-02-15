/**
 * Created by vezir on 2/13/16.
 */

angular.module('myApp.parking.lot', ['myApp.parking.level'])

.factory('Lot', function (Level) {

    function Lot(map) {
        this.levels = [];
        for (var i = 0; i < map.length; i++) {
            this.levels.push(new Level(map[i].places, map[i].floor));
        }
    }

    Lot.prototype.getLevels = function () {
        return this.levels;
    };

    Lot.prototype.remove = function (vehicle) {
        var places = [];
        for (var i = 0; i < this.levels.length; i++) {
            places = this.levels[i].getPlaces();
            for (var j = 0; j < places.length; j++) {
                if (places[j].removeVehicle(vehicle)) {
                    return true;
                }
            }
        }
        return false;
    };

    Lot.prototype.add = function (vehicle) {
        this.remove(vehicle);
        var places = [];
        for (var i = 0; i < this.levels.length; i++) {
            places = this.levels[i].getPlaces();
            for (var j = 0; j < places.length; j++) {
                if (places[j].addVehicle(vehicle)) {
                    return true;
                }
            }
        }
        return false;
    };

    Lot.prototype.put = function (vehicle, level, place) {
        this.remove(vehicle);
        var places = [];
        for (var i = 0; i < this.levels.length; i++) {
            places = this.levels[i].getPlaces();
            if (level == i) {
                for (var j = 0; j < places.length; j++) {
                    if (place == j) {
                        places[j].addVehicle(vehicle);
                        return true;
                    }
                }
            }
        }
        return false;
    };

    Lot.prototype.getUsedPlaces = function () {
        var places = [];
        var tmp = [];
        var vehicles = [];
        for (var i = 0; i < this.levels.length; i++) {
            places = this.levels[i].getPlaces();
            for (var j = 0; j < places.length; j++) {
                tmp = places[j].getVehicles();
                for (var k = 0; k < tmp.length; k++) {
                    vehicles.push({
                        vehicle: tmp[k].vehicle,
                        level: this.levels[i],
                        place: places[j],
                        subPlace: tmp[k].subPlace
                    });
                }
            }
        }
        return vehicles;
    };

    return Lot;
});