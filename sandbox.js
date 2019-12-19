'use strict';

const { Parser } = require('./xml-parser'); 
const { pipe, pprint, partialRight } = require('./lib/util');
const {
    zipper,
    arrayZip,
    xmlZip,
    attr,
    text,
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
//pprint('"z"', pipe(down, partialRight(insertRight, 'z'), right, node)(dz));
//pprint('"z"', pipe(down, partialRight(insertLeft, 'z'), left, node)(dz));
//pprint('[ "a", "z", "b" ]', pipe(down, down, partialRight(insertRight, 'z'), up, node)(dz));

(async function () {
    const tree = await Parser().parse('<a><b>c</b><b z="123">d</b><b><p>e</p><![CDATA[characters with markup]]></b></a>');
    const tz = xmlZip(tree);
    pprint('"d"', pipe(down, down, right, text)(tz));
    pprint('123', pipe(down, down, right, attr('z'))(tz));
})();
