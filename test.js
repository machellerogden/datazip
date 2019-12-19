#!/usr/bin/env node

'use strict';

const assert = require('assert');

const {
    pipe, pprint, partialRight
} = require('./util');

const {
    zipper, arrayZip, xmlZip, node, isBranch, children,
    makeNode, path, lefts, rights, down, up, isEnd,
    root, right, rightmost, left, leftmost,
    insertRight, insertLeft, replace, edit, insertChild,
    appendChild, next, prev, remove
} = require('.');

const data = [
    [ 'a', 'b' ],
    'c',
    [ 'd', 'e' ]
];

const dz = arrayZip(data);

assert.deepEqual(
    node(dz),
    [ [ 'a', 'b' ], 'c', [ 'd', 'e' ] ]
);

assert.deepEqual(
    pipe(down, node)(dz),
    [ 'a', 'b' ]
);

assert.deepEqual(
    pipe(down, up, down, node)(dz),
    [ 'a', 'b' ]
);

assert.deepEqual(
    pipe(down, right, node)(dz),
    'c'
);

assert.deepEqual(
    pipe(down, down, right, node)(dz),
    'b'
);

assert.deepEqual(
    pipe(down, down, node)(dz),
    'a'
);

assert.deepEqual(
    pipe(down, down, right, up, right, node)(dz),
    'c'
);

assert.deepEqual(
    pipe(down, down, right, left, node)(dz),
    'a'
);

assert.deepEqual(
    pipe(next, node)(dz),
    [ 'a', 'b' ]
);

assert.deepEqual(
    pipe(next, next, node)(dz),
    'a'
);

assert.deepEqual(
    pipe(next, next, next, node)(dz),
    'b'
);

assert.deepEqual(
    pipe(next, next, next, next, node)(dz),
    'c'
);

assert.deepEqual(
    pipe(next, next, next, next, next, node)(dz),
    [ 'd', 'e' ]
);

assert.deepEqual(
    pipe(next, next, next, next, next, next, node)(dz),
    'd'
);

assert.deepEqual(
    pipe(next, next, next, next, next, next, next, node)(dz),
    'e'
);

assert.deepEqual(
    pipe(next, next, next, next, next, next, next, next, node)(dz),
    [ [ 'a', 'b' ], 'c', [ 'd', 'e' ] ]
);

assert.deepEqual(
    pipe(down, partialRight(insertRight, 'z'), right, node)(dz),
    'z'
);

assert.deepEqual(
    pipe(down, partialRight(insertLeft, 'z'), left, node)(dz),
    'z'
);

assert.deepEqual(
    pipe(down, down, partialRight(insertRight, 'z'), up, node)(dz),
    [ 'a', 'z', 'b' ]
);