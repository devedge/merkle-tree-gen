
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















/*
d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
b3a8e0e1f9ab1bfe3a36f231f676f78bb30a519d2b21e6c530c0eee8ebb4a5d0
    2d9bee295e5bc131d25601ff7996ed9e675102fc11bad1231f114a3421c6a1ba

49d180ecf56132819571bf39d9b7b342522a2ac6d23c1418d3338251bfe469c8
19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7
    e637bf1e4b7552d3c8f3da025981f6c0a52cef1ce2037f3dd6d37377df80fb36
    
        2beba380f702a5efe2ce25d8e010f7d5a0831ec19990f6eb147f62e07ce6ba64

5316ca1c5ddca8e6ceccfce58f3b8540e540ee22f6180fb89492904051b3d531
6208ef0f7750c111548cf90b6ea1d0d0a66f6bff40dbef07cb45ec436263c7d6
    ff950e0886d57fa0c5086a94273d128892f1a6e06529b018ab1b3500d7a7db84

44cb730c420480a0477b505ae68af508fb90f96cf0ec54c6ad16949dd427f13a
4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce
    a113860336a84e16196edf3be0a926e37a0a70596fd7a22a15d70b37e4de83e8

        a9f0c096ddcee42e40cfb6a6710b3cfcecab1056426baa74ffa3684c31cf6eca


            99b065ebaea0ab4e801f8cd3ebcddecb795d2c2064dd3f23ca45ca5ed6d312c8


73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049
48f89b630677c2cbb70e2ba05bf7a3633294e368a45bdc2c7df9d832f9e0c941
    f4ee855a78adfebc4c0f2a0495f02b4c5deebcd39e80582e307462af389f540e

        c2abb80b39f1c388d1a675b74928bcaeea235a1d6525939eaaf043b11b2f2420

            49f69495c209485c60e3bd5c93734d1d86eda5152671002501a7d81ee29ac8db



                a3a2082cf20a393cc739d87a5d792ebcba7e418e94daf920744546bb2be647da
*/