'use strict';

const add = (a, b) => a + b;
const sum = (a, b, callback) => callback(a, b);

console.log(sum(5, 2, add));
