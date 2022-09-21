'use strict';

const log = (base, n) => Math.log(n) / Math.log(base);

const lg = log.bind(null, 10);
const ln = log.bind(null, Math.E);

console.log(lg(5));
console.log(ln(5));
