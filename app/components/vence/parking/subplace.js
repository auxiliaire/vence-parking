
angular.module('myApp.parking.subplace', ['myApp.parking.vehicle'])

.factory('SubPlace', function (Vehicle) {

    function SubPlace(bike) {
        this.vehicle = bike;
    }

    SubPlace.prototype.getBike = function () {
        return this.vehicle;
    };

    SubPlace.prototype.getVehicle = function () {
        return this.getBike();
    };

    return SubPlace;
});