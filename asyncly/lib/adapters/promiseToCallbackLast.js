'use strict';

// Convert Promise to callback-last
//   promise <Promise>
//   callback <Function>
const promiseToCallbackLast = (promise) => (callback) => {
  promise.then(
    (result) => callback(null, result),
    (reason) => callback(reason)
  );
};

const promise = Promise.resolve('result');

const callbackFromPromise = promiseToCallbackLast(promise);

callbackFromPromise((err, result) => {
  if (err) return console.log(err);
  console.log(result);
});
