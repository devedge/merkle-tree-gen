

var merkle = require('./lib/user-methods.js');


var args = {
    file: '/home/usr/Desktop/here.mp4',
    algo: 'sha256',
    blocksize: 1048576
}

merkle.fromFile(args, function (err, tree) {

    if (err) {
        console.log(err);
    } else {
        console.log('tree: ' + tree.root);
        console.log('levels: ' + tree.numlevels);
        console.log('leaves: ' + tree.numleaves);
    }
    
});



