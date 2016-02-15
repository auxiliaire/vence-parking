
angular.module('myApp.parking.place', ['myApp.parking.subplace'])

.factory('Place', function (SubPlace, Vehicle) {

    const MAX_SUBPLACES = 2;

    function Place(id) {
        this.id = id;
        this.vehicle = null;
        this.subPlaces = [];
        this.usedSubPlaces = 0;
    }

    Place.prototype.getId = function () {
        return this.id;
    };

    Place.prototype.isFull = function () {
        return (this.usedSubPlaces == MAX_SUBPLACES);
    };

    Place.prototype.isPartiallyFull = function () {
        return (this.usedSubPlaces > 0);
    };

    Place.prototype.isFree = function () {
        return (this.usedSubPlaces == 0);
    };

    Place.prototype.isPartiallyFree = function () {
        retur (this.usedSubPlaces < MAX_SUBPLACES);
    };

    Place.prototype.addVehicle = function (vehicle) {
        if (!this.isFull()) {
            if (vehicle.getType() == Vehicle.T_BIKE) {
                var sub = new SubPlace(vehicle);
                this.subPlaces.push(sub);
                this.usedSubPlaces++;
                return true;
            } else if (this.isFree()) {
                this.vehicle = vehicle;
                this.usedSubPlaces += 2;
                return true;
            }
        }
        return false;
    };

    Place.prototype.removeVehicle = function (vehicle) {
        var vehicleId = vehicle.getLicence();
        if (this.vehicle != null) {
            if (this.vehicle.getLicence() == vehicleId) {
                this.vehicle = null;
                this.usedSubPlaces = 0;
                return true;
            }
        } else {
            if (this.subPlaces.hasOwnProperty(vehicleId)) {
                this.subPlaces.splice(this.subPlaces.indexOf(this.subPlaces[vehicleId]), 1);
                this.usedSubPlaces--;
                return true;
            }
        }
        return false;
    };

    Place.prototype.hasVehicle = function (vehicleId) {
        if (this.vehicle != null) {
            return (this.vehicle.getLicence() == vehicleId);
        } else {
            return this.subPlaces.hasOwnProperty(vehicleId);
        }
    };

    Place.prototype.getVehicles = function () {
        var vehicles = [];
        if (this.vehicle != null) {
            vehicles.push({ vehicle: this.vehicle, subPlace: null });
        } else {
            angular.forEach(this.subPlaces, function (value, key) {
                vehicles.push({ vehicle: value.getVehicle(), subPlace: key });
            });
        }
        return vehicles;
    };

    return Place;
});