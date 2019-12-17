'use strict';

const { compose } = require('./util');
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
    [ "c", "d", [ "e", "f", [ "g" ] ] ]
];

const dz = arrayZip(data);

console.log(require('util').inspect(
    //dz
    //down(dz)
    //right(down(dz))
    //up(right(down(dz)))
    next(dz)
    //compose(next, next, down)(dz)
    //compose(right, down, right, right, down)(dz)
    //compose(lefts, right, down, right, right, down)(dz)
    //compose(rights, right, down, right, right, down)(dz)
    //compose(up, up, right, down, right, right, down)(dz)
    //compose(path, right, down, right, right, down)(dz)
, { depth: 8, colors: true }));
