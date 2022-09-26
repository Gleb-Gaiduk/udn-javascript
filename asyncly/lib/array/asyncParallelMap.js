'use strict';

// Asynchronous map (iterate parallel)
//   items - <Array>, incoming
//   onItemFn - <Function>, to be executed for each value in the array
//     current - <any>, current element being processed in the array
//     callback - <Function>
//       err - <Error> | <null>
//       value - <any>
//   done - <Function>, on done
//     err - <Error> | <null>
//     result - <Array>
const asyncParallelMap = (items, onItemFn, onDoneFn) => {
  const length = items?.length;

  if (!length) {
    onDoneFn(null, []);
    return;
  }

  let count = 0;
  const result = new Array(length);
  let isError = false;

  const next = (index, err, value) => {
    if (isError) return;
    if (err) {
      isError = true;
      done(err);
      return;
    }

    result[index] = value;
    count++;

    if (count === length) onDoneFn(null, result);
  };

  for (let i = 0; i < length; i++) {
    onItemFn(items[i], next.bind(null, i));
  }
};

const arr = [1, 2, 3];

asyncParallelMap(
  arr,
  (cur, callback) => {
    callback(null, cur * 2);
  },
  (err, result) => {
    if (err) return console.log(err);
    console.log(result);
  }
);
