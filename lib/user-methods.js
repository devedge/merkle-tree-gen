(function () {

    'use strict';



    // function merkleFromArray() {

    // }
    // function merkleFromArray() {

    // }

    function merkleFromFile(file) {
        var FastMap = require('collections/fast-map');
        var ReadFile = require('./hash-file.js');
        var genMerkle = require('./merkle-gen');

        var blockreader = new ReadFile();
        var fastMap = new FastMap();
        var tree;

        blockreader.hashBlocks(file, fastMap, function (retMap) {
            tree = genMerkle(retMap, 'sha256');

            console.log('Tree root: ' + tree.root);
            console.log('Number of levels: ' + tree.numlevels);
            console.log('Number of leaves: ' + tree.numleaves);
        });

    }

    // function merkleFromStream() {

    // }

    merkleFromFile('/home/usr/Ritzer\ 1996,\ Abridged.pdf');

})();