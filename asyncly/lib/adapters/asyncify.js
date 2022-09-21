'use strict';

// Convert sync function to callback-last / error-first contract
//   fn <Function> regular synchronous function
//
// Returns: <Function> with contract: callback-last / error-first

const asyncify =
  (fn) =>
  (...args) => {
    const callback = args.pop();

    setTimeout(() => {
      try {
        const result = fn(...args);
        return callback(null, result);
      } catch (error) {
        return callback(error);
      }
    }, 0);
  };

const syncFn = (par1, par2) => par1 + par2;
const asyncFn = asyncify(syncFn);

asyncFn(1, 2, (err, value) => {
  if (err) return console.log(err);
  console.log(value);
});
