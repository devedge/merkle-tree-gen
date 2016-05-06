(function () {

    'use strict';

    /**
     * genMerkle()
     *
     * This generates a Merkle Tree from a FastMap of leaves.
     *
     * @param {object} fastMap The FastMap of leaves, passed in from 
     *                          the array hash or the file hash functions.
     * @param {object} hashalgo The hash algorithm to use
     * @param {callback} cb The Merkle Tree object
     *
     */
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
        var nextval;
        
        var currentlevel = 0;
        var nl = fastMap.length;

        tree.root = '';
        tree.hash = hashalgo;
        tree.leaves = nl;
        tree.levels = '';

        // Push all of the leaves onto the main queue
        for (i = 0; i < nl; i++) {
            nextval = fastMap.get(i);

            // Add the leaves to the 'tree' object
            tree[nextval] = {
                "type": "leaf",
                "level": currentlevel,
                "right": "data",
                "left": "data",
                "parent": ""
            };

            deque1.push(nextval);
        }

        currentlevel++;

        var right;
        var left;

        // While the main queue doesn't have only one value left (the root)
        while (deque1.length > 1) {

            // Get the two first-pushed values off of the queue and hash them
            right = deque1.shift();
            left = deque1.shift();
            chash = hasha(left + right, {algorithm: hashalgo});

            // Add the hash and nodes to the 'tree' object
            tree[chash] = {
                "type": "node",
                "level": currentlevel,
                "right": right,
                "left": left,
                "parent": ""
            };

            tree[right].parent = chash;
            tree[left].parent = chash;

            // push the result onto a second queue
            deque2.push(chash);


            // If there are an odd number of leaves (only one hash left), 
            // pop the last value, concatenate it with itself, and hash that
            if (deque1.length === 1) {
                right = deque1.pop();
                chash = hasha(right + right, {algorithm: hashalgo});

                // Add the hash and nodes to the 'tree' object
                tree[chash] = {
                    "type": "node",
                    "level": currentlevel,
                    "right": right,
                    "left": right,
                    "parent": ""
                };

                tree[right].parent = chash;

                deque2.push(chash);
            }


            // If everything is off of the main queue (deque1) but the copy
            // queue (deque2) is not empty, there is another level in the tree
            // and more values to hash. Pop them and push them back to the main
            // queue.
            if ((deque1.length === 0) && (deque2.length !== 0)) {
                currentlevel++;

                len2 = deque2.length;

                for (j = 0; j < len2; j++) {
                    deque1.push(deque2.shift());
                }
            }
        }

        // Set the number of levels, the root node value, and the root node type.
        tree.levels = currentlevel;
        tree.root = deque1.pop(); 
        tree[tree.root].type = "root";

        // return tree
        cb(tree);
    }

    // Export the genMerkle() function
    module.exports = genMerkle;

})();
