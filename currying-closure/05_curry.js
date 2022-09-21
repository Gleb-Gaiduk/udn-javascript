'use strict';

const curry =
  (fn) =>
  (...args) => {
    const minRequiredParamsLength = fn.length;

    if (minRequiredParamsLength > args.length) {
      const bindedWithPassedArgs = fn.bind(null, ...args);
      return curry(bindedWithPassedArgs);
    }

    return fn(...args);
  };

const sum4 = (a, b, c, d) => a + b + c + d;

const res = curry(sum4);

console.log(res(1, 2, 3, 4));
console.log(res(1, 2, 3)(4));
console.log(res(1, 2)(3, 4));
console.log(res(1)(2)(3)(4));
