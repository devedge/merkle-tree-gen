(function () {

    'use strict';

    var hasha = require('hasha');
    var FastMap = require('collections/fast-map');

    var hashAlgorithm;
    var hashlist;
    var fastMap;
    // var testval;
    var alen;

    function HashArray(hA = 'sha256', hL = false) {
        hashAlgorithm = hA;
        hashlist = hL;
        // testval = hasha("87tab98gn8ysdgfydg", {algorithm: hashAlgorithm});
    }

    HashArray.prototype.hashElements = function hashElements(array, cb) {

        fastMap = new FastMap();
        alen = array.length;

        if (hashlist) {

            array.forEach(function (value, index) {
                fastMap.add(value, index);
            });

        } else {

            array.forEach(function (value, index) {
                fastMap.add(hasha(JSON.stringify(value), {algorithm: hashAlgorithm}), index);
            });
        }

        cb(fastMap);
    }

    module.exports = HashArray;

})();