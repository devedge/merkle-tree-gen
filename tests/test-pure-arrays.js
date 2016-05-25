// import merkle-tree-gen manually
var merkle = require('../index');
var assert = require('assert');


// Array of numbers
var numarr = [2, 456, 67, 9, 81, 58, 43, 3, 42, 454];

// manually calcuated
var numarrexp = 'a3a2082cf20a393cc739d87a5d792ebcba7e418e94daf920744546bb2be647da';

/* Verify that the number array was converted to a string and hashed */
var args1 = {
    array: numarr,
    hashalgo: 'sha256'
};

merkle.fromArray(args1, function (err, tree) {

    if (!err) {
        assert(tree.root === numarrexp);
    } else {
        console.log(err);
    }
});



// Mixed array of numbers, strings, and objects
var mixedarr = [
    382,
    {
        a1: 344,
        a2: 'ujthenf',
        a3: 13
    },
    3,
    'asdfghjkl',
    {
        value:'6453g3gr3f3bn3',
        thing: 'dfd8f78787f8dfdmfjdf',
        one_more: 939659
    },
    '55%^54vvvgvg',
    984076
];

// calculated manually
var mixedarrexp = '8a003caa1b26caa287d55c86019c38b6a0b9556c8eecd8550ba0044023bef124';


/* Verify that the mixed array was properly hashed */
var args2 = {
    array: mixedarr,
    hashalgo: 'sha256'
};

merkle.fromArray(args2, function (err, tree) {

    if (!err) {
        assert(tree.root === mixedarrexp);
    } else {
        console.log(err);
    }
});
