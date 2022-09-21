'use strict';

const partial =
  (fn, ...args) =>
  (...rest) =>
    fn(...args.concat(rest));

const sum4 = (a, b, c, d) => a + b + c + d;

const res = partial(sum4, 1, 2, 3, 4);
console.log(res());
