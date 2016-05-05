(function () {

    'use strict';

    /**
     * fromArray()
     *
     * Generates a Merkle Tree from an array with the arguments passed in. The
     * array cannot be empty. It can contain either values to be hashed, or an 
     * actual list of hashes.
     *
     * @param {object} args An object containing the arguments to construct 
     *                      the Tree. See the README for more info.
     * @param {callback} cb An object containing the Merkle Tree. See 
     *                      the README for more info.
     *
     */
    function fromArray(args, cb) {
        



        // Import dependencies
        var HashArray = require('./lib/hash-array');
        var genMerkle = require('./lib/merkle-gen');
    }

    /**
     * fromFile()
     *
     * Generates a Merkle Tree from the arguments passed into args. The absolute path 
     * to the file must be specified.
     *
     * @param {object} args An object containing the arguments to construct 
     *                      the Tree. See the README for more info.
     * @param {callback} cb An object containing the Merkle Tree. See 
     *                      the README for more info.
     *
     */
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
        var HashFile = require('./lib/hash-file');
        var genMerkle = require('./lib/merkle-gen');

        // Initialize the blockreader
        var blockreader = new HashFile(hashalgo, blocksize);

        // Hash the file using the specified block size
        blockreader.hashBlocks(file, function (fastMap) {

            // Generate a Merkle Tree from the leaves
            genMerkle(fastMap, hashalgo, function (tree) {
                cb(null, tree);
            });
        });
    }

    // Export the fromFile() and fromArray() functions
    module.exports = {
        fromFile: fromFile,
        fromArray: fromArray
    }

})();
