(function () {

    'use strict';

    function fromArray(args, cb) {
        
    }

    function fromFile(args, cb) {

        var file;
        var blocksize;
        var hash_algo;

        if (!args.file) {
            cb('The absolute path to a file is required', null);
        } else {
            file = args.file;
        }

        if (!args.blocksize) {
            blocksize = 1048576;
        } else {
            blocksize = args.blocksize;
        }

        if (!args.algo) {
            hash_algo = 'sha256';
        } else {
            hash_algo = args.algo;
        }

        var ReadFile = require('./hash-file.js');
        var genMerkle = require('./merkle-gen');

        var blockreader = new ReadFile(hash_algo, blocksize);

        blockreader.hashBlocks(file, function (fastMap) {

            genMerkle(fastMap, hash_algo, function (tree) {
                cb(null, tree);
            });
        });
    }

    module.exports = {
        fromFile: fromFile,
        fromArray: fromArray

    }

})();