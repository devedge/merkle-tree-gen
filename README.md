# node-merkle-tree
[![Licence](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/devedge/node-merkle-tree/blob/master/LICENSE) <br>
Merkle Tree implementation in NodeJS
<br><br>
Currently under development. This will generate a Merkle Tree object from a file or an array. For the array, if the elements in the array is a list of hashes, they will be used as the leaves in the Merkle Tree. Otherwise, each element will be hashed to become a leaf.
<br><br>
Once the basic implementation is done, proofs, verification methods, and partial tree verification will be added.
<br><br>

<br><br>
Install from NPM:  (example, not uploaded yet) <br>
```bash
npm install node-merkle-tree --save
```
<br>
Usage in NodeJS: <br>
<!-- Info about how to use -->

[Generate from a file](https://github.com/devedge/node-merkle-tree#Generate-from-a-file)
[Generate from an array](https://github.com/devedge/node-merkle-tree#Generate-from-a-file)
[Generate from an array of hashes](https://github.com/devedge/node-merkle-tree#Generate-from-a-file)

<!-- Info about the merkle tree json object -->
[Example](https://github.com/devedge/node-merkle-tree#Example)


<br>
Supports hashes provided by the NodeJS `crypto` module. Ex: `md4`, `md5`, `sha1`, `sha256`, `sha512`, `whirlpool` 
<br>
Dependencies: [`collections`](https://www.npmjs.com/package/collections), [`hasha`](https://www.npmjs.com/package/hasha), [`chunking-streams`](https://www.npmjs.com/package/chunking-streams)

## Generate from a file
```javascript
// Hash a file
var merkle = require('node-merkle-tree');

var args = {
    file: '/absolute/filepath/to/file.zip',
    hashalgo: 'sha256', // optional, defaults to sha256
    blocksize: 1048576  // optional, defaults to 1 MiB (Megabyte), 1048576 Bytes
}

merkle.fromFile(args, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Number of leaves: ' + tree.leaves);
        console.log('Number of levels: ' + tree.levels);
    }
});
```
Example result: <br>

```
Root hash: 4b84a0fea1374585707c9e92eee03b989222ab3e443d6191431346b2174f8814
Number of leaves: 9
Number of levels: 5
```


<br>
## Generate from an array
```javascript
// Hash an array
var merkle = require('node-merkle-tree');

var args = {
    // The elements are converted .toString() before being hashed
    array: [12, someObject, "string1", "string2", secondObject],
    hashalgo: 'sha256'  // optional, defaults to sha256
}

merkle.fromArray(args, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Number of leaves: ' + tree.leaves);
        console.log('Number of levels: ' + tree.levels);
    }
});
```
<br>
## Generate from an array of hashes
```javascript
// Hash an array of hashes
var merkle = require('node-merkle-tree');

var args = {
    // The hashes must be of the same hash type as 'hashalgo'
    array: [
        "98325468840887230d248330de2c99f76750d131aa6076dbd9e9a0ab20f09fd0",
        "e60b311f8206962615afce5b2cfad4674bc0e49bef8043bb5f19ca746eb671eb",
        "ff1da71d8a78d13fd280d29c3f124e6e97b78a5c8317a2a9ff3d6c5f7294143f",
        "3b071f3d67e907ed5e2615ee904b9135e7ad4db666dad72aa63af1b04076eb9d",
        "9c005dd47633f54816133136a980dac48968c3ddb1d5c6d4f20d76e2295034ae",
        "c27f85771711ec1c70129714ed5c9083c96f1f12506203f46590c2146a93fae2"
    ],
    hashalgo: 'sha256', // optional, defaults to sha256
    hashlist: true      // optional, defaults to false. If true, the array elements will be treated
                        // as hashes and become leaves of the Merkle Tree
}

merkle.fromArray(args, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Number of leaves: ' + tree.leaves);
        console.log('Number of levels: ' + tree.levels);
    }
});
```

<br><br>
## Example
An example Merkle Tree JSON object generated from a 2.6 MiB file, using SHA-256 and hashing every 1 MiB of the file (blocksize of 1048576):
```json
{
    "root": "6abfe8109b239d0d2ba67ea7a4f9852dae3a07484fad995296ee23933ad2a224",
    "hashalgo": "sha256",
    "leaves": 3,
    "levels": 3,
    "3515590e98ad159338b2d5f8d6b9a5123534a898f4e0c2d33040305c6a9654e7": {
        "type": "leaf",
        "level": 0,
        "right": "data",
        "left": "data",
        "parent": "d38a90546d828c4e3cbbcf0c13b8600dfdc6a82ed95f66a5850edda6f75d67fc"
    },
    "eb1d2c20c49195606dd0c65a8ab5134438d253907473fd96e5bb4a343a706bda": {
        "type": "leaf",
        "level": 0,
        "right": "data",
        "left": "data",
        "parent": "d38a90546d828c4e3cbbcf0c13b8600dfdc6a82ed95f66a5850edda6f75d67fc"
    },
    "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2": {
        "type": "leaf",
        "level": 0,
        "right": "data",
        "left": "data",
        "parent": "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372"
    },
    "d38a90546d828c4e3cbbcf0c13b8600dfdc6a82ed95f66a5850edda6f75d67fc": {
        "type": "node",
        "level": 1,
        "right": "3515590e98ad159338b2d5f8d6b9a5123534a898f4e0c2d33040305c6a9654e7",
        "left": "eb1d2c20c49195606dd0c65a8ab5134438d253907473fd96e5bb4a343a706bda",
        "parent": "6abfe8109b239d0d2ba67ea7a4f9852dae3a07484fad995296ee23933ad2a224"
    },
    "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372": {
        "type": "node",
        "level": 1,
        "right": "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2",
        "left": "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2",
        "parent": "6abfe8109b239d0d2ba67ea7a4f9852dae3a07484fad995296ee23933ad2a224"
    },
    "6abfe8109b239d0d2ba67ea7a4f9852dae3a07484fad995296ee23933ad2a224": {
        "type": "root",
        "level": 2,
        "right": "d38a90546d828c4e3cbbcf0c13b8600dfdc6a82ed95f66a5850edda6f75d67fc",
        "left": "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372",
        "parent": "root"
    }
}
```
