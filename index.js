(function () {

    'use strict';

    function fromArray(args, cb) {
        
    }

    function fromFile(args, cb) {

        var file;
        var blocksize;
        var hashalgo;

        if (!args.file) {
            cb('The absolute path to a file is required', null);
        } else {
            file = args.file;
        }

        if (!args.blocksize) {
            blocksize = 1048576;    // Set default size to 1 MiB
        } else {
            blocksize = args.blocksize;
        }

        if (!args.hashalgo) {
            hashalgo = 'sha256';    // Set the default hash as SHA-256
        } else {
            hashalgo = args.hashalgo;
        }

        // Import dependencies
        var ReadFile = require('./lib/hash-file.js');
        var genMerkle = require('./lib/merkle-gen');

        // Initialize the blockreader
        var blockreader = new ReadFile(hashalgo, blocksize);

        // Hash the file with the block size
        blockreader.hashBlocks(file, function (fastMap) {

            // Generate a Merkle Tree from the leaves
            genMerkle(fastMap, hashalgo, function (tree) {
                cb(null, tree);
            });
        });
    }

    module.exports = {
        fromFile: fromFile,
        fromArray: fromArray
    }

})();
