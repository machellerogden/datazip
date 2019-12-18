'use strict';

const { pipe, pprint, partialRight } = require('./util');
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

//pprint('[ [ "a", "b" ], "c", [ "d", "e" ] ]', node(dz));
//pprint('[ "a", "b" ]', pipe(down, node)(dz));
//pprint('[ "a", "b" ]', pipe(down, up, down, node)(dz));
//pprint('"c"', pipe(down, right, node)(dz));
//pprint('"b"', pipe(down, down, right, node)(dz));
//pprint('"a"', pipe(down, down, node)(dz));
//pprint('"c"', pipe(down, down, right, up, right, node)(dz));
//pprint('"a"', pipe(down, down, right, left, node)(dz));
//pprint('[ "a", "b" ]', pipe(next, node)(dz));
//pprint('"a"', pipe(next, next, node)(dz));
//pprint('"b"', pipe(next, next, next, node)(dz));
//pprint('"c"', pipe(next, next, next, next, node)(dz));
//pprint('[ "d", "e" ]', pipe(next, next, next, next, next, node)(dz));
//pprint('"d"', pipe(next, next, next, next, next, next, node)(dz));
//pprint('"e"', pipe(next, next, next, next, next, next, next, node)(dz));
//pprint('[ [ "a", "b" ], "c", [ "d", "e" ] ]', pipe(next, next, next, next, next, next, next, next, node)(dz));
pprint('"z"', pipe(down, partialRight(insertRight, 'z'), right, node)(dz));
pprint('"z"', pipe(down, partialRight(insertLeft, 'z'), left, node)(dz));
pprint('[ "a", "z", "b" ]', pipe(down, down, partialRight(insertRight, 'z'), up, node)(dz));
