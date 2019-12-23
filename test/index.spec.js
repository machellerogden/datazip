'use strict';

import test from 'ava';

const { pipe, pprint, partialRight } = require('nilish');

const {
    zipper, arrayZip, node, isBranch, children, makeNode,
    path, lefts, rights, down, up, isEnd, root, right,
    rightmost, left, leftmost, insertRight, insertLeft,
    replace, edit, insertChild, appendChild, next, prev,
    remove
} = require('..');

const data = [
    [ 'a', 'b' ],
    'c',
    [ 'd', 'e' ]
];

const dz = arrayZip(data);

/**********************************************************************
 * array zip
 */

test("node", async t => {
    t.deepEqual(node(dz), [ [ 'a', 'b' ], 'c', [ 'd', 'e' ] ]);
});

test("down, node", async t => {
    t.deepEqual(pipe(down, node)(dz), [ 'a', 'b' ]);
});

test("down, up, down, node", async t =>{
    t.deepEqual(pipe(down, up, down, node)(dz), [ 'a', 'b' ]);
});

test("down, right, node", async t =>{
    t.deepEqual(pipe(down, right, node)(dz), 'c');
});

test("down, down, right, node", async t =>{
    t.deepEqual(pipe(down, down, right, node)(dz), 'b');
});

test("down, down, node", async t =>{
    t.deepEqual(pipe(down, down, node)(dz), 'a');
});

test("down, down, right, up, right, node", async t =>{
    t.deepEqual(pipe(down, down, right, up, right, node)(dz), 'c');
});

test("down, down, right, left, node", async t =>{
    t.deepEqual(pipe(down, down, right, left, node)(dz), 'a');
});

test("next, node", async t =>{
    t.deepEqual(pipe(next, node)(dz), [ 'a', 'b' ]);
});

test("next, next, node", async t =>{
    t.deepEqual(pipe(next, next, node)(dz), 'a');
});

test("next, next, next, node", async t =>{
    t.deepEqual(pipe(next, next, next, node)(dz), 'b');
});

test("next, next, next, next, node", async t =>{
    t.deepEqual(pipe(next, next, next, next, node)(dz), 'c');
});

test("next, next, next, next, next, node", async t =>{
    t.deepEqual(pipe(next, next, next, next, next, node)(dz), [ 'd', 'e' ]);
});

test("next, next, next, next, next, next, node", async t =>{
    t.deepEqual(pipe(next, next, next, next, next, next, node)(dz), 'd');
});

test("next, next, next, next, next, next, next, node", async t =>{
    t.deepEqual(pipe(next, next, next, next, next, next, next, node)(dz), 'e');
});

test("next, next, next, next, next, next, next, next, node", async t =>{
    t.deepEqual(pipe(next, next, next, next, next, next, next, next, node)(dz), [ [ 'a', 'b' ], 'c', [ 'd', 'e' ] ]);
});

test("down, insertRight 'z', right, node", async t =>{
    t.deepEqual(pipe(down, partialRight(insertRight, 'z'), right, node)(dz), 'z');
});

test("down, insertLeft 'z', left, node", async t =>{
    t.deepEqual(pipe(down, partialRight(insertLeft, 'z'), left, node)(dz), 'z');
});

test("down, down, insertRight 'z', up, node", async t =>{
    t.deepEqual(pipe(down, down, partialRight(insertRight, 'z'), up, node)(dz), [ 'a', 'z', 'b' ]);
});
