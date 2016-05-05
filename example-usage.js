// Import the package
var merkle = require('./index.js');

// Specify the arguments for the tree
var fileargs = {
    file: '/home/usr/ginueapig.zip',
    hashalgo: 'sha256',
    blocksize: 1048576
}

// Async merkle generation. This can take some time depending
// on the filesize.
merkle.fromFile(fileargs, function (err, tree) {

    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(tree));
    }
    
});


// var arrayargs = {
//     array: [],
//     hashalgo: 'sha256',
//     hashlist: true
// }


// merkle.fromArray(arrayargs, function (err, tree) {
    
// });
