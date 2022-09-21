'use strict';

const curry = (fn, ...params) => {
  const curried = (...args) =>
    fn.length > args.length ? curry(fn.bind(null, ...args)) : fn(...args);

  return params.length ? curried(...params) : curried;
};

const sum4 = (a, b, c, d) => a + b + c + d;

const res = curry(sum4);

console.log(res(1, 2, 3, 4));
console.log(res(1, 2, 3)(4));
console.log(res(1, 2)(3, 4));
console.log(res(1)(2)(3)(4));
