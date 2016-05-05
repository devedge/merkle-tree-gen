# node-merkle-tree
[![Licence](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/devedge/node-merkle-tree/blob/master/LICENSE) <br>
Merkle Tree implementation in NodeJS
<br><br>
Currently under development. This will generate a Merkle Tree object from a file or an array. For the array, if the elements in the array is a list of hashes, they will be used as the leaves in the Merkle Tree. Otherwise, each element will be hashed to become a leaf.
<br><br>
Once the basic implementation is done, proofs and verification methods will be added.

<br><br>
Install from NPM (example, not uploaded yet) <br>
`npm install --save node-merkle-tree`
<br><br>
Usage in NodeJS <br>
```javascript
// Hash a file
var merkle = require('node-merkle-tree');

var args = {
    file: '/absolute/filepath/to/file.zip',
    hashalgo: 'sha256', // optional
    blocksize: 1048576  // optional
}

merkle.fromFile(args, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Number of leaves: ' + tree.leaves);
        console.log('Number of levels: ' + tree.levels);
    }
});
```

<br><br>
An example Merkle Tree object generated from a 2.6 MiB file, using SHA-256 and hashing every 1 MiB of the file
```json
{
    "root": "6abfe8109b239d0d2ba67ea7a4f9852dae3a07484fad995296ee23933ad2a224",
    "hash": "sha256",
    "leaves": 3,
    "levels": 3,
    "3515590e98ad159338b2d5f8d6b9a5123534a898f4e0c2d33040305c6a9654e7": {
        "type": "leaf",
        "right": "data",
        "left": "data",
        "level": 0
    },
    "eb1d2c20c49195606dd0c65a8ab5134438d253907473fd96e5bb4a343a706bda": {
        "type": "leaf",
        "right": "data",
        "left": "data",
        "level": 0
    },
    "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2": {
        "type": "leaf",
        "right": "data",
        "left": "data",
        "level": 0
    },
    "d38a90546d828c4e3cbbcf0c13b8600dfdc6a82ed95f66a5850edda6f75d67fc": {
        "type": "node",
        "right": "3515590e98ad159338b2d5f8d6b9a5123534a898f4e0c2d33040305c6a9654e7",
        "left": "eb1d2c20c49195606dd0c65a8ab5134438d253907473fd96e5bb4a343a706bda",
        "level": 1
    },
    "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372": {
        "type": "node",
        "right": "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2",
        "left": "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2",
        "level": 1
    },
    "6abfe8109b239d0d2ba67ea7a4f9852dae3a07484fad995296ee23933ad2a224": {
        "type": "root",
        "right": "d38a90546d828c4e3cbbcf0c13b8600dfdc6a82ed95f66a5850edda6f75d67fc",
        "left": "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372",
        "level": 2
    }
}
```
