'use strict';

const partial =
  (fn, x) =>
  (...args) =>
    fn(x, ...args);

const sum4 = (a, b, c, d) => a + b + c + d;

const res = partial(sum4, 1);
console.log(res(1, 1, 2));
