

var merkle = require('./index.js');


var fileargs = {
    file: '/home/usr/Desktop/here.mp4',
    hashalgo: 'sha256',
    blocksize: 1048576
}

merkle.fromFile(fileargs, function (err, tree) {

    if (err) {
        console.log(err);
    } else {
        console.log('tree: ' + tree.root);
        console.log('levels: ' + tree.numlevels);
        console.log('leaves: ' + tree.numleaves);
    }
    
});


var arrayargs = {
    array: [],
    hashalgo: 'sha256',
    hashlist: true
}


merkle.fromArray(arrayargs, function (err, tree) {
    
});
