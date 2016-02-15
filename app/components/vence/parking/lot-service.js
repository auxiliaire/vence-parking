'use strict';

angular.module('myApp.parking.lotService', ['myApp.parking.lot'])

.value('map', [
    {floor: 'Level 1', places: 25},
    {floor: 'Level 2', places: 17},
    {floor: 'Level 3', places: 9},
    {floor: 'Level 4', places: 27}
])

.service('lotService', function (Lot, map) {

    this.get = function () {
        if (typeof(this.lot) == 'undefined') {
            this.lot = new Lot(map);
        }
        return this.lot;
    }

});