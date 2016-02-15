/**
 * Created by vezir on 2/13/16.
 */

angular.module('myApp.parking.vehicle', [])

.factory('Vehicle', function () {

    const T_CAR = 'Car';
    const T_BIKE = 'Motorbike';

    var types = [T_CAR, T_BIKE];

    function Vehicle(licence, type) {
        this.licence = licence;
        if (types.indexOf(type) !== -1) {
            this.type = type;
        }
    }

    Vehicle.types = angular.copy(types);
    Vehicle.T_CAR = angular.copy(T_CAR);
    Vehicle.T_BIKE = angular.copy(T_BIKE);

    Vehicle.prototype.getLicence = function() {
        return this.licence;
    };

    Vehicle.prototype.getType = function() {
        return this.type;
    };

    return Vehicle;
});