'use strict';

const {
    isPlainObject,
    clone,
    assign
} = require('./util');

const SYM_META = Symbol.for('datazip.meta');

const meta = v => clone(v[SYM_META]) || {};

function withMeta(target, data) {
    if (!isPlainObject(data)) throw new Error('meta data must be an object');
    const result = clone(target);
    const targetMeta = meta(target);
    const givenMeta = clone(data);
    const updatedMeta = assign(targetMeta, givenMeta);
    result[SYM_META] = updatedMeta;
    return result;
}

module.exports = {
    meta,
    withMeta
};
