(function () {

    'use strict';

    // This generates a Merkle Tree from a FastMap of leaves

    function genMerkle(fastMap, hashalgo, cb) {
        var hasha = require('hasha');
        var Deque = require('collections/deque');
        var deque1 = new Deque();
        var deque2 = new Deque();
        var tree = {};

        var i;
        var j;
        var len2;
        var chash;      // the concatenated hashes
        
        var levels = 1;
        var mapIndex = fastMap.length;
        var nl = fastMap.length;

        tree.numleaves = nl;

        // Push all of the leaves onto the main queue
        for (i = 0; i < nl; i++) {
            deque1.push(fastMap.get(i));
        }


        // While the main queue doesn't have only one value left (the root)
        while (deque1.length > 1) {

            // Get the two first-pushed values off of the queue and hash them
            chash = hasha(deque1.shift() + deque1.shift(), {algorithm: hashalgo});
            fastMap.add(chash, mapIndex);   // Add it to the map
            deque2.push(chash);             // push the result onto a second queue

            // If there are an odd number of leaves (only one hash left), 
            // pop the last value, concatenate it with itself, and hash that
            if (deque1.length === 1) {
                chash = deque1.pop();
                chash = hasha(chash + chash, {algorithm: hashalgo});

                mapIndex++;

                fastMap.add(chash, mapIndex);
                deque2.push(chash);
            }

            // If everything is off of the main queue (deque1) but the copy
            // queue (deque2) is not empty, there is another level in the tree
            // and more values to hash. Pop them and push them back to the main
            // queue.
            if ((deque1.length === 0) && (deque2.length !== 0)) {
                levels++;

                len2 = deque2.length;

                for (j = 0; j < len2; j++) {
                    deque1.push(deque2.shift());
                }
            }

            // Increment the index of the map
            mapIndex++;
        }

        // Set the number of levels and the root node. More needs to be added
        tree.numlevels = levels;
        tree.root = fastMap.get(fastMap.length - 1);

        // return tree
        cb(tree);
    }

    module.exports = genMerkle;

})();
