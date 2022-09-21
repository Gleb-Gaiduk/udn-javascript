'use strict';

const inverse = (f) => (x) => 1 / f(x);
const cosecant = inverse(Math.sin);

console.log(cosecant(5));
