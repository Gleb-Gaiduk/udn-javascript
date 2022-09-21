'use strict';

// Convert Promise-returning to callback-last / error-first contract
//   fn <Function> promise-returning function
//
// Returns: <Function>
const callbackify =
  (promiseFn) =>
  (...args) => {
    const callback = args.pop();

    promiseFn(...args).then(
      (result) => callback(null, result),
      (reason) => callback(reason)
    );
  };

const testPromise = () => Promise.resolve('result');
const asyncFn = callbackify(testPromise);

asyncFn((err, value) => {
  if (err) return console.log('Error!', err);
  console.log(value);
});
