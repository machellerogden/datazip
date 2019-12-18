'use strict';

const { pipe, pprint } = require('./util');
const {
    zipper,
    arrayZip,
    xmlZip,
    node,
    isBranch,
    children,
    makeNode,
    path,
    lefts,
    rights,
    down,
    up,
    isEnd,
    root,
    right,
    rightmost,
    left,
    leftmost,
    insertRight,
    insertLeft,
    replace,
    edit,
    insertChild,
    appendChild,
    next,
    prev,
    remove
} = require('.');

/**
 * where in we play with zippers
 */

const data = [
    [ "a", "b" ],
    "c",
    [ "d", "e" ]
];

const dz = arrayZip(data);

//pprint('dz', node(dz)); // [ [ "a", "b" ], "c", [ "d", "e" ] ]
//pprint('down', pipe(down, node)(dz)); // [ "a", "b" ]
//pprint('down, up', pipe(down, up, down, node)(dz)); // [ "a", "b" ]
//pprint('down, right', pipe(down, right, node)(dz)); // "c"
//pprint('down, down, right', pipe(down, down, right, node)(dz)); // => "b"
pprint('down, down, right, up, right', pipe(down, down, right, up, right, node)(dz)); // => "c"
//pprint('down, down, right, left', pipe(down, down, right, left, node)(dz)); // => "a"
//pprint('next', pipe(next, node)(dz)); // [ "a", "b" ]
//pprint('next, next', pipe(next, next, node)(dz)); // "a"
//pprint('next, next, next', pipe(next, next, next, node)(dz)); // "b"
//pprint('next, next, next, next', pipe(next, next, next, next, node)(dz)); // "c"
//pprint('next, next, next, next, next', pipe(next, next, next, next, next, node)(dz)); // [ "d", "e" ]
//pprint('next, next, next, next, next, next', pipe(next, next, next, next, next, next, node)(dz)); // "d"
//pprint('next, next, next, next, next, next, next', pipe(next, next, next, next, next, next, next, node)(dz)); // "e"
//pprint('next, next, next, next, next, next, next, next', pipe(next, next, next, next, next, next, next, next, node)(dz)); // [ [ "a", "b" ], "c", [ "d", "e" ] ]
//pprint(pipe(down, next, next)(dz));
//pprint(pipe(down, right, right, down)(dz));
//pprint(pipe(down, right, right, down, lefts)(dz));
//pprint(pipe(down, right, right, down, right, rights)(dz));
//pprint(pipe(down, right, right, down, right, up, up)(dz));
//pprint(pipe(down, right, right, down, right, path)(dz));
