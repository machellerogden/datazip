'use strict';

const {
    isPlainObject,
    clone,
    assign,
    box
} = require('./util');

const SYM_META = Symbol.for('datazip.meta');

const meta = v => clone(v[SYM_META]) || {};

function withMeta(target, data) {
    const result = clone(target);
    const boxed = box(result);
    boxed[SYM_META] = data;
    return boxed;
}

//function withMeta(target, data) {
    //if (!isPlainObject(data)) throw new Error('meta data must be an object');
    //const result = clone(target);
    //const targetMeta = meta(target);
    //const givenMeta = clone(data);
    //const updatedMeta = assign(targetMeta, givenMeta);
    //const boxed = box(result);
    //boxed[SYM_META] = updatedMeta;
    //return boxed;
//}

module.exports = {
    meta,
    withMeta
};
