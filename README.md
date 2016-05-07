# node-merkle-tree
[![Licence](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/devedge/node-merkle-tree/blob/master/LICENSE) <br>
Merkle Tree implementation in NodeJS
<br><br>

Install from NPM:  (example, not uploaded yet) <br>
```bash
npm install node-merkle-tree --save
```

This modules generates a Merkle Tree from either [a file](#generate-from-a-file), [an array of any elements](#generate-from-an-array), or an [array of hashes](#generate-from-an-array-of-hashes). The returned value is a JavaScript object, which can be converted into JSON using `JSON.stringify()`. [Example Merkle Tree Object](#example)
<br><br>
The `node-merkle-tree` module can be set up and used with three simple steps (Example for hashing a file). <br><br>
Import the module: <br>
```javascript
var merkle = require('node-merkle-tree');
```

Specify the relevant arguments for the function: <br>
```
var args = {
    file: '/absolute/filepath/to/file.zip'
}
```

Generate the Merkle Tree: <br>
```javascript
merkle.fromFile(args, function (err, tree) {

    // the 'tree' object can be used here
});
```

<br>
Usage information:
* File [(example usage)](#generate-from-a-file) <br>
    To hash a file, an absolute path to an existing file must be passed in. Optional parameters include the hash algorithm (in lowercase, eg. `sha512`), and a 'blocksize'. <br>
    The file will be split into chunks specified by the blocksize (in bytes), and each chunk will be hashed to create a leaf on the Merkle Tree. <br><br>
* Array [(example usage)](#generate-from-an-array) <br>
    Hash an array (non-zero size) so that the hash of each of the elements is a leaf on the Merkle Tree. <br>
    Each element (if it isn't a string) will be converted into a string using `JSON.stringify(value)`. <br><br>
* Array of hashes [(example usage)](#generate-from-an-array-of-hashes) <br>
    If you want to pass in hashes already generated using some other method, this function will use those hashes as the leaves in the generated Merkle Tree. <br>
    The hashes must have been generated with the same algorithm as specified with `hashalgo`.



<br>
This supports hashes provided by the NodeJS `crypto` module. Ex: `md4`, `md5`, `sha1`, `sha256`, `sha512`, `whirlpool` 
<br>
Dependencies: [`collections`](https://www.npmjs.com/package/collections), [`hasha`](https://www.npmjs.com/package/hasha), [`chunking-streams`](https://www.npmjs.com/package/chunking-streams)
<br><br>
`TODO:` Implement verification methods/proofs and extracting/concatenating branches into a tree. 

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
    // The elements are converted to a string with JSON.stringify() before being hashed
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
Result: <br>

```
Root hash: a548b8eb59e1579759d65473ec470673a0b55e62925f096fdf0f7f127036f90c
Number of leaves: 6
Number of levels: 4
```

<br>
## Example
An example Merkle Tree JSON object generated from a 2.6 MiB file, using SHA-256 and hashing every 1 MiB of the file (blocksize of 1048576):
```json
{
    "root": "3a9f60b4feb44b003ff6d1426718a7e4d81725892cea87b9938e25900530b72e",
    "hashalgo": "sha256",
    "leaves": 3,
    "levels": 3,
    "3515590e98ad159338b2d5f8d6b9a5123534a898f4e0c2d33040305c6a9654e7": {
        "type": "leaf",
        "level": 0,
        "left": "data",
        "right": "data",
        "parent": "1340b622bcae8720ba3aa90b966511a1b675715e3de236a4f4905bb064e7a05a"
    },
    "eb1d2c20c49195606dd0c65a8ab5134438d253907473fd96e5bb4a343a706bda": {
        "type": "leaf",
        "level": 0,
        "left": "data",
        "right": "data",
        "parent": "1340b622bcae8720ba3aa90b966511a1b675715e3de236a4f4905bb064e7a05a"
    },
    "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2": {
        "type": "leaf",
        "level": 0,
        "left": "data",
        "right": "data",
        "parent": "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372"
    },
    "1340b622bcae8720ba3aa90b966511a1b675715e3de236a4f4905bb064e7a05a": {
        "type": "node",
        "level": 1,
        "left": "3515590e98ad159338b2d5f8d6b9a5123534a898f4e0c2d33040305c6a9654e7",
        "right": "eb1d2c20c49195606dd0c65a8ab5134438d253907473fd96e5bb4a343a706bda",
        "parent": "3a9f60b4feb44b003ff6d1426718a7e4d81725892cea87b9938e25900530b72e"
    },
    "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372": {
        "type": "node",
        "level": 1,
        "left": "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2",
        "right": "85c3cf8fbdcf26ae2f301907d90e49c50203a782aa28cee28b341567592ca6a2",
        "parent": "3a9f60b4feb44b003ff6d1426718a7e4d81725892cea87b9938e25900530b72e"
    },
    "3a9f60b4feb44b003ff6d1426718a7e4d81725892cea87b9938e25900530b72e": {
        "type": "root",
        "level": 2,
        "left": "1340b622bcae8720ba3aa90b966511a1b675715e3de236a4f4905bb064e7a05a",
        "right": "44210e019bccfd1f775b8e83909423a2da293db47bc1a9e4bf826a37b5346372",
        "parent": "root"
    }
}
```
