// import merkle-tree-gen manually
var merkle = require('../index');


// even list
var arraylist1 = [
    '001e65b944dad8cd7185ce7fa1f3855d0120bbf86fda9baf790fa66c96a8ba7d',
    '022cf292cfcd0f71525e0b641ed8f767a9c22e7b6543958cbc2a671fd8ff2984',
    '077de16e9e9635e1cbcda235569b880e1bbb54aeff744348c490427bb839a308',
    '0d3e65862d7b2a60167f3d4c403de275c4ec4484ededd1852c80d1f9b6144c96',
    '157bb6beb99dc35aca668b955a5690e69126872dc97da8af250f12dc068900fc',
    '3c6bfef87232f6f84636550306ce17c1d6bb62ee1f2483319a5f91e9ebed7248',
    '3f1f7f68975113084ecd6a98857a0f3aa6cf2c02806ccc2c1eab61d74baff52a',
    '4043e3714f8032044ef92d83c06203642480747d65db0de3ebc10adec8e42b62',
    '535944028fcdaeddb11ab107752fab414bd7a36c82b31b2ae59fdcae8152bc9a',
    '6af978d3978e7b8553fc61ce8d7849ba3ca08b92e6b1ef1f31fc38eabb1d7b08',
    '76ca9d8bc8681a43c58d4db2b115cabccf1eaec124d315a76d3b7115068af31a',
    '78eba37431a611efe1107a7c78b842843d00b20a8df8e66c82a6b89b56d19595',
    '9504ef231229e0f00d20feef2069158d028992fe1e3665b9fc5844708216f162',
    'b04377c1cc4191f719e407a74c1cfa136fbdb763cfbfcfe58c51372dede9460b',
    'bbee85f17b9a31588cca73c213935d9b322b16ded377a324ed0cc67c0b79a591',
    'd2fa30b45f5fd1029d0a53ce0656919decea67b7eb512426d52c2066435098f0',
    'd76d8e120322f75f0f951dbc7a5fd889183541bebd27ae81150c0c0bd448bedb',
    'e4295d9f615298a4dad53bd4d1f5231928474294864d9ef1136b9c2fd6148ef8',
    'ea307081794db51513c94a9b97b786d156de779c5b8d79f62f28c4d0716c6053',
    'f9585e07eb32c8a4d9cbd1838fbb67f4861ba2c2cdf5b3793cec43efd9a869f6'
];

// odd list
var arraylist2 = [
    '001e65b944dad8cd7185ce7fa1f3855d0120bbf86fda9baf790fa66c96a8ba7d',
    '022cf292cfcd0f71525e0b641ed8f767a9c22e7b6543958cbc2a671fd8ff2984',
    '077de16e9e9635e1cbcda235569b880e1bbb54aeff744348c490427bb839a308',
    '0d3e65862d7b2a60167f3d4c403de275c4ec4484ededd1852c80d1f9b6144c96',
    '157bb6beb99dc35aca668b955a5690e69126872dc97da8af250f12dc068900fc',
    '3c6bfef87232f6f84636550306ce17c1d6bb62ee1f2483319a5f91e9ebed7248',
    '3f1f7f68975113084ecd6a98857a0f3aa6cf2c02806ccc2c1eab61d74baff52a',
    '4043e3714f8032044ef92d83c06203642480747d65db0de3ebc10adec8e42b62',
    '535944028fcdaeddb11ab107752fab414bd7a36c82b31b2ae59fdcae8152bc9a',
    '6af978d3978e7b8553fc61ce8d7849ba3ca08b92e6b1ef1f31fc38eabb1d7b08',
    '76ca9d8bc8681a43c58d4db2b115cabccf1eaec124d315a76d3b7115068af31a',
    '78eba37431a611efe1107a7c78b842843d00b20a8df8e66c82a6b89b56d19595',
    '9504ef231229e0f00d20feef2069158d028992fe1e3665b9fc5844708216f162',
    'b04377c1cc4191f719e407a74c1cfa136fbdb763cfbfcfe58c51372dede9460b',
    'bbee85f17b9a31588cca73c213935d9b322b16ded377a324ed0cc67c0b79a591',
    'd2fa30b45f5fd1029d0a53ce0656919decea67b7eb512426d52c2066435098f0',
    'd76d8e120322f75f0f951dbc7a5fd889183541bebd27ae81150c0c0bd448bedb',
    'e4295d9f615298a4dad53bd4d1f5231928474294864d9ef1136b9c2fd6148ef8',
    'ea307081794db51513c94a9b97b786d156de779c5b8d79f62f28c4d0716c6053',
    'f9585e07eb32c8a4d9cbd1838fbb67f4861ba2c2cdf5b3793cec43efd9a869f6',
    'fe4440ceea49edc8a832992ab5a99044126a948e0701b7c660026f8d844dd597'
];

// one-element list
var arraylist3 = ['535944028fcdaeddb11ab107752fab414bd7a36c82b31b2ae59fdcae8152bc9a'];

// empty list
var arraylist4 = [];


// pre-computed manually
var expectedroot1 = '5f0b92f4cb44091d5137b144786d9b5740afdd4e9e86d4c8a33a9d431aa4778f';
var expectedroot2 = '0c932597b1bb9712d1278640c4ad9d5fa6de8b3302bfab2d5ccca2eed0057ce2'; 
var expectedroot3 = '535944028fcdaeddb11ab107752fab414bd7a36c82b31b2ae59fdcae8152bc9a'; 
var expectedroot4 = 'An array with at least 1 element is required';

/* Test on a valid even list, arraylist1 */
var args1 = {
    array: arraylist1,
    hashalgo: 'sha256',
    hashlist: true
};

merkle.fromArray(args1, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Expected:  ' + expectedroot1);
    }
});


/* Test on a valid odd list, arraylist2 */
var args2 = {
    array: arraylist2,
    hashalgo: 'sha256',
    hashlist: true
};

merkle.fromArray(args2, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Expected:  ' + expectedroot2);
    }
});


/* Test on a valid one-element list, arraylist3 */
var args3 = {
    array: arraylist3,
    hashalgo: 'sha256',
    hashlist: true
};

merkle.fromArray(args3, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Expected:  ' + expectedroot3);
    } 
});


/* Test on an invalid empty list, arraylist4 */
var args4 = {
    array: arraylist4,
    hashalgo: 'sha256',
    hashlist: true
};

merkle.fromArray(args4, function (err, tree) {

    if (!err) {
        console.log('Root hash: ' + tree.root);
        console.log('Expected:  failure');
    } else {
        console.log('Out: ' + err);
        console.log('Exp: ' + expectedroot4);
    }
});



/*


001e65b944dad8cd7185ce7fa1f3855d0120bbf86fda9baf790fa66c96a8ba7d
022cf292cfcd0f71525e0b641ed8f767a9c22e7b6543958cbc2a671fd8ff2984
    555d05ade5ea8411164400b4f325a9eed0212270a1ba3c3928c107891361cdf5
            bc70c830ecbcef85d08d962f5d32aff4c74da8114ea0127e452580af49c452d5
077de16e9e9635e1cbcda235569b880e1bbb54aeff744348c490427bb839a308
0d3e65862d7b2a60167f3d4c403de275c4ec4484ededd1852c80d1f9b6144c96
    e19198443da68db2b3a101d8849e511a73051967666a838dc0e10d96e5270506
                        81289cb0283a529ec216a5f6c97627a4aad8c3c5f39bd1a08dc837bb9e567ead
157bb6beb99dc35aca668b955a5690e69126872dc97da8af250f12dc068900fc
3c6bfef87232f6f84636550306ce17c1d6bb62ee1f2483319a5f91e9ebed7248
    61c38729c7ff5960f143ed276ae5d44aea948a470fdeec3585ab109a0c042001
            6d0ecf76323fd2307afc9b154b79d2e0fc67c53b0d9c74c13086d3a7cb68386d
3f1f7f68975113084ecd6a98857a0f3aa6cf2c02806ccc2c1eab61d74baff52a
4043e3714f8032044ef92d83c06203642480747d65db0de3ebc10adec8e42b62
    090c285b54311c4f3b737bc8de55cb7f02fea6a7db8991b90dd3fd2902a4f125


535944028fcdaeddb11ab107752fab414bd7a36c82b31b2ae59fdcae8152bc9a
6af978d3978e7b8553fc61ce8d7849ba3ca08b92e6b1ef1f31fc38eabb1d7b08
    d8fd91ba811747f63c300e71b14d30b63fa2c8eaf6cd03015ea1d10dec9bbcea
            398233d619ee0b620cda2cf3a7b87bc3d65e64e7851a85c4d95170b9f357f504
76ca9d8bc8681a43c58d4db2b115cabccf1eaec124d315a76d3b7115068af31a
78eba37431a611efe1107a7c78b842843d00b20a8df8e66c82a6b89b56d19595
    ca2a1dbcb25b1a543ba69aa7c2c7ed9fc4d47ea103922bba408b1fd2082fffec
                        6f644ed8d9bbd5c7aef3a32ec743f76969c0ad85413daf6ae035e4f4ecdf3776
9504ef231229e0f00d20feef2069158d028992fe1e3665b9fc5844708216f162
b04377c1cc4191f719e407a74c1cfa136fbdb763cfbfcfe58c51372dede9460b
    111a2eed8364fb386f21cedaa51fce47a61f6b29d47b4474fc05918e3ffdc281
            3cc449cb629ed71a7cee4cbd887c6654fee46e7b92a93a7c7009e3c37ca5b952
bbee85f17b9a31588cca73c213935d9b322b16ded377a324ed0cc67c0b79a591
d2fa30b45f5fd1029d0a53ce0656919decea67b7eb512426d52c2066435098f0
    71cc7955702915216bd61f416b133ee095f97fb26b5a9b0ae9154f55016fc208
                                ca359b4d67740d80b4a045ce04a5ff6d3a7a3f30e5b980df369c82a1911d8004
                                                    0c932597b1bb9712d1278640c4ad9d5fa6de8b3302bfab2d5ccca2eed0057ce2
d76d8e120322f75f0f951dbc7a5fd889183541bebd27ae81150c0c0bd448bedb
e4295d9f615298a4dad53bd4d1f5231928474294864d9ef1136b9c2fd6148ef8
    e07cc5a090546c994a8afa610afd1a6bb10f1d75ae92d79f99b3a8a325cdf9bb
            d15d5ee1e82ea0c4b8550d570b13c2166ee62cfa2ce58170d3b8f1ecef0bd9d5
ea307081794db51513c94a9b97b786d156de779c5b8d79f62f28c4d0716c6053
f9585e07eb32c8a4d9cbd1838fbb67f4861ba2c2cdf5b3793cec43efd9a869f6
    36169ff6a23456ce803e676b041c8aad759fd93c59a4d71cd57f0ac1306d11f8
                        8367f7e4eb53d2b20e080385edc3c9ddfd6df35d7a7ed0efcd5678fcd9841733
fe4440ceea49edc8a832992ab5a99044126a948e0701b7c660026f8d844dd597
    43f24c9848b71e77fdcef8305f78cda79033fc792dbd6e1c1330d447c520b7ca
            86c1cc0276de3b1fac81263ce1f4f6d76e5f65358955a2e6d914ab25eb265863
                                c8e08b5703ef6eb4f4a69ee9da8321c3168790e7d0becee003f4226efa62d654
*/

