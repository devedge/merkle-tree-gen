(function () {

    'use strict';

    // This chunks a file and returns an (array? fastmap?) of the hashes
    
    var fs = require('fs');
    var hasha = require('hasha');
    var chunkingStreams = require('chunking-streams');
    var SizeChunker = chunkingStreams.SizeChunker;

    var hashAlgorithm;
    var blockSize;
    var numBlocks;
    var fileStat;
    var chunker;
    var fastMap;
    var input;
    var buf;

    /**
     * Constructor for the reader. This initializes the settings for hashing a file, 
     * so the hashBlocks() function can be reused on different files.
     *
     * @param {Integer} bS: The block size in bytes; the default value is 1 MiB. Each of 
     *      the blocks becomes a leaf in the Merkle Tree
     * @param {String} hA: The hash function to be used, in lowercase.
     */
    function ReadFile(bS = 1048576, hA = 'sha256') {
        if (!(this instanceof ReadFile)) {
            return new ReadFile();
        }

        hashAlgorithm = hA;
        blockSize = bS;

        chunker = new SizeChunker({
            chunkSize: blockSize,
            flushTail: true
        });
    };

    // Hashes a file using the 'reader''s settings
    ReadFile.prototype.hashBlocks = function hashBlocks(file, fastMap, callBack) {
        
        // Determine how many blocks/chunks will be generated
        fileStat = fs.statSync(file);
        numBlocks = Math.floor(fileStat.size/blockSize) + 1;

        // Initiallize the file stream and the fastMap
        input = fs.createReadStream(file);

        // At the start of every block/chunk, reinitialize the buffer
        chunker.on('chunkStart', function (id, done) {
            buf = new Buffer.allocUnsafe(0);
            done();
        });

        // At the end of every block/chunk, hash the buffer and store it
        // in a FastMap. If the number of blocks has been reached, return
        // the fastMap in a callback.
        chunker.on('chunkEnd', function (id, done) {
            fastMap.add(hasha(buf, {algorithm: hashAlgorithm}), id);
            done();

            if ((id + 1) === numBlocks) {
                callBack(fastMap);
            }
        });

        // On every data event that happens while reading a file, append the
        // new data to the buffer.
        chunker.on('data', function (chunk) {
            buf = Buffer.concat([buf, chunk.data]);
        });

        // Begin piping the file stream into the chunker
        input.pipe(chunker);
    };

    // Export the reader function as a module
    module.exports = ReadFile;

})();
