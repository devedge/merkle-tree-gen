(function () {

    'use strict';

    var hasha = require('hasha');
    var FastMap = require('collections/fast-map');

    var hashAlgorithm;
    var hashlist;
    var fastMap;

    function HashArray(hA = 'sha256', hL = false) {
        hashAlgorithm = hA;
        hashlist = hL;
    }

    HashArray.prototype.hashElements = function hashElements(array, cb) {

        fastMap = new FastMap();

        if (hashlist) {

            array.forEach(function (value, index) {
                fastMap.add(value, index);
            });

        } else {

            array.forEach(function (value, index) {
                if (typeof value !== 'string') {
                    value = JSON.stringify(value);
                }

                fastMap.add(hasha(value, {algorithm: hashAlgorithm}), index);
            });
        }

        cb(fastMap);
    }

    module.exports = HashArray;

})();