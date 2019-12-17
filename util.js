'use strict';

const _ = exports;

const nt = new Set(['string', 'number']);

_.nil = void 0;
_.identity = v => v;
_.isArray = Array.isArray;
_.assign = Object.assign;
_.is = (v, t) => typeof v === t;
_.isNil = v => v == _.nil;
_.notNil = v => v != _.nil;
_.isObject = v => _.notNil(v) && _.is(v, 'object');
_.isEqual = (a, b) => [ a, b ].every(_.isObject)
    ? Object.is(a, b)
    : a === b;
_.isFalse = _.not = v => _.isEqual(v, false);
_.isFalsy = v => _.isNil(v) || _.isFalse(v);
_.complement = fn => (...args) => _.isFalsy(fn(...args));
_.isTruthy = _.complement(_.isFalsy);
_.isZero = v => v === 0;
_.isString = v => _.is(v, 'string');
_.isNumber = v => _.is(v, 'number');
_.isNumeric = n => nt.has(typeof n) && !isNaN(parseInt(n, 10)) && isFinite(n);
_.isBoolean = v => _.is(v, 'boolean');
_.isUndefined = v => _.is(v, 'undefined');
_.isNull = v => v === null;
_.isPlainObject = v => Object.prototype.toString.call(v) === '[object Object]';
_.clone = x =>
    _.isArray(x)   ? [ ...x ].map(_.clone)
  : _.isObject(x)  ? Object.entries({ ...x }).reduce((a, [k, v]) => (a[k] = _.clone(v), a), {})
  :                x;
_.pipe = (first, ...rest) => (...args) => rest.reduce((acc, fn) => fn(acc), first(...args));
_.compose = (...fns) => (f => (...args) => _.pipe(...f)(...args))([ ...fns ].reverse());
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);

_.first = v => _.isArray(v) ? v[0] : nil;
_.last = v => _.isArray(v) ? v[v.length - 1] : nil;
_.butlast = v => _.isArray(v) ? v.slice(0, -1) : nil;

// TODO - annotate for behavioral side-effects?
_.peek = _.first;
_.pop = _.last;

_.exception = msg => { throw new Error(msg); };
