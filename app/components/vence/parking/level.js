/**
 * Created by vezir on 2/13/16.
 */

angular.module('myApp.parking.level', ['myApp.parking.place'])

.factory('Level', function (Place) {

    function Level(numPlaces, floor) {
        this.numPlaces = numPlaces;
        this.floor = floor;
        this.places = [];
        for (var i = 0; i < numPlaces; i++) this.places.push(new Place(i + 1));
    }

    Level.prototype.getNumPlaces = function () {
        return this.numPlaces;
    };

    Level.prototype.getFloor = function () {
        return this.floor;
    };

    Level.prototype.countFreePlaces = function () {
        var numFree = 0;
        for (var i = 0; i < this.places.length; i++) {
            if (this.places[i].isFree()) {
                numFree++;
            }
        }
        return numFree;
    };

    Level.prototype.countPartiallyFreePlaces = function () {
        var numFree = 0;
        for (var i = 0; i < this.places.length; i++) {
            if (this.places[i].isPartiallyFree()) {
                numFree++;
            }
        }
        return numFree;
    };

    Level.prototype.hasFree = function () {
        return (this.countFreePlaces() > 0);
    };

    Level.prototype.hasPartiallyFree = function () {
        return (this.countPartiallyFreePlaces() > 0);
    };

    Level.prototype.countFullPlaces = function () {
        var numFull = 0;
        for (var i = 0; i < this.places.length; i++) {
            if (this.places[i].isFull()) {
                numFull++;
            }
        }
        return numFull;
    };

    Level.prototype.isFull = function () {
        return (this.countFullPlaces() == this.places.length);
    };

    Level.prototype.getPlaces = function () {
        return this.places;
    };

    return Level;
});