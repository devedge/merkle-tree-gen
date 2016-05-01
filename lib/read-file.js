(function () {

    'use strict';
    
    var fs = require('fs');
    var hasha = require('hasha');
    var FastMap = require('collections/fast-map');
    var chunkingStreams = require('chunking-streams');
    var SizeChunker = chunkingStreams.SizeChunker;

    var numBlocks;
    var fileStat;
    var chunker;
    var fastMap;
    var input;
    var buf;

    function ReadFile(blockSize = 1048576, hashAlgorithm = 'sha256') {
        if (!(this instanceof ReadFile)) {
            return new ReadFile();
        }

        chunker = new SizeChunker({
            chunkSize: blockSize,
            flushTail: true
        });
    };

    ReadFile.prototype.hashBlocks = function hashBlocks(file, cb) {
        
        fileStat = fs.statSync(file);
        numBlocks = Math.floor(fileStat.size/blockSize) + 1;
        input = fs.createReadStream(file);
        fastMap = new FastMap();

        chunker.on('chunkStart', function (id, done) {
            buf = new Buffer.allocUnsafe(0);
            done();
        });

        chunker.on('chunkEnd', function (id, done) {
            fastMap.add(hasha(buf, {algorithm: hashAlgorithm}), id);
            done();

            if ((id + 1) === numBlocks) {
                cb(err, fastMap);
            }
        });

        chunker.on('data', function (chunk) {
            buf = Buffer.concat([buf, chunk.data]);
        });

        input.pipe(chunker);
    };

    module.exports = ReadFile;

})();
