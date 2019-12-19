'use strict';

const {
    nil, isNil, notNil, isEmpty, isArray,
    isString, identity, first, last, butlast,
    complement, reverse, exception, compose
} = require('./lib/util');

const { meta, withMeta } = require('./meta');

const zipper = (isBranch, children, makeNode, root) =>
    withMeta([ root, nil ], { isBranch, children, makeNode });

const arrayZip = root =>
    zipper(isArray, identity, (node, children) => withMeta(children, meta(node)), root);

const xmlZip = root =>
    zipper(complement(isString), v => v.content, (node, children) => ({ ...node, content: children }), root);

const node = first;

const isBranch = loc => meta(loc).isBranch(node(loc));

const children = loc => isBranch(loc)
    ? meta(loc).children(node(loc))
    : exception('called children on a leaf node');

const makeNode = (loc, node, children) =>
    meta(loc).makeNode(node, children);

const cursor = loc => {
    const [ _, c = {} ] = loc;
    return c;
};

const path = loc =>
    cursor(loc).pnodes;

const lefts = loc =>
    cursor(loc).l;

const rights = loc =>
    cursor(loc).r;

const down = loc => {
    if (!isBranch(loc)) return;
    const [ node, path ] = loc;
    const cs = children(loc);
    const [ c, ...cnext ] = cs;
    if (isEmpty(cs)) return;
    return withMeta([
        c,
        {
            l: [],
            pnodes: [ ...(path && path.pnodes || []), node ],
            ppath: path,
            r: cnext
        }
    ], meta(loc));
};

const up = loc => {
    const [ node, path ] = loc;
    if (isEmpty(path)) return;
    const { l, ppath, pnodes, r, changed } = path;
    if (isEmpty(pnodes)) return;
    const pnode = first(pnodes);
    return withMeta((changed
        ? [ makeNode(loc, pnode, [ ...l, node, ...r ]), { ...ppath, changed } ]
        : [ pnode, ppath ]),
        meta(loc));
};

const isEnd = loc => cursor(loc).end;

const root = loc => {
    if (isEnd(loc)) return node(loc);
    while (true) {
        const p = up(loc);
        if (isNil(p)) return node(loc);
        loc = p;
    }
};

const right = loc => {
    const [ node, path ] = loc;
    if (isNil(path)) return;
    const { l, r:rs } = path;
    if (isEmpty(rs)) return;
    const [ r, ...rnext ] = rs;
    return withMeta([
        r,
        { ...path, l: [ ...l, node ], r: rnext }
    ], meta(loc));
};

const rightmost = loc => {
    const [ node, path ] = loc;
    if (isNil(path)) return loc;
    const { l, r } = path;
    if (isEmpty(r)) return loc;
    return withMeta([
        last(r),
        { ...path, l: [ ...l, node, butlast(r) ], r: nil }
    ], meta(loc));
};

const left = loc => {
    const [ node, path ] = loc;
    if (isNil(path)) return;
    const { l, r } = path;
    if (isEmpty(l)) return;
    return withMeta([
        last(l),
        { ...path, l: butlast(l), r: [ ...node, r ] }
    ], meta(loc));
};

const leftmost = loc => {
    const [ node, path ] = loc;
    const { l, r } = path;
    if (isNil(path) || isEmpty(l)) loc;
    return withMeta([
        first(l),
        { ...path, l: [], r: [ ...rest(l), node, ...r ] }
    ], meta(loc));
};

const insertLeft = (loc, item) => {
    const [ node, path ] = loc;
    if (isNil(path)) return exception('Insert at top');
    const { l } = path;
    return withMeta([
        node,
        { ...path, l: [ ...l, item ], changed: true }
    ], meta(loc));
};

const insertRight = (loc, item) => {
    const [ node, path ] = loc;
    if (isNil(path)) return exception('Insert at top');
    const { r } = path;
    return withMeta([
        node,
        { ...path, r: [ item, ...r ], changed: true }
    ], meta(loc));
};

const replace = (loc, node) => {
    const [ _, path ] = loc;
    return withMeta([
        node,
        { ...path, changed: true }
    ], meta(loc));
};

const edit = (loc, f, ...args) =>
    replace(loc, f(...[ ...node(loc), ...args ]));

const insertChild = (loc, item) =>
    replace(loc, makeNode(loc, node(loc), [ item, ...children(loc) ]));

const appendChild = (loc, item) =>
    replace(loc, makeNode(loc, node(loc), [ ...children(loc), item ]));

const next = loc => {
    if (isEnd(loc)) return loc;
    if (isBranch(loc) && down(loc)) return down(loc);
    if (right(loc)) return right(loc);
    while (true) {
        if (isNil(up(loc))) return withMeta([ node(loc), { end: true } ], meta(loc));
        if (right(up(loc))) return right(up(loc));
        loc = up(loc);
    }
};

const prev = loc => {
    const lloc = left(loc);
    if (isNil(lloc)) return up(loc);
    while (true) {
        const child = isBranch(loc) ? down(loc) : nil;
        if (isNil(child)) return loc;
        loc = rightmost(child);
    }
};

const remove = loc => {
    const [ node, path ] = loc;
    const { l, ppath, pnodes, r:rs } = path;
    if (isNil(path)) return exception('Remove at top');
    if (l.length < 1) return withMeta([
        makeNode(loc, first(pnodes), rs),
        { ...ppath, changed: true }
    ], meta(loc));

    while (true) {
        loc = withMeta([
            first(l),
            { ...path, l: last(l), changed: true }
        ], meta(loc));
        const child = isBranch(loc) ? down(loc) : nil;
        if (isNil(child)) return loc;
        loc = rightmost(child);
    }
};

module.exports = {
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
};
